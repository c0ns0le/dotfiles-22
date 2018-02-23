import lldb
import re


class SectionNotFound(Exception):
    pass


def _extract_address_from(memory_string):
    result = re.match(r"^data found at location: (0x[0-9a-fA-F]+)$",
                      memory_string, re.MULTILINE)
    return result.group(1)


def _find_section(module, section_name, segment_name):
    section = module.section[section_name]
    if not section:
        raise SectionNotFound()

    try:
        return next(x for x in section if x.GetName() == segment_name)
    except StopIteration:
        raise SectionNotFound()


def _output_for_command(debugger, command):
    interpreter = debugger.GetCommandInterpreter()
    result = lldb.SBCommandReturnObject()
    interpreter.HandleCommand(command, result)

    if result.Succeeded():
        return str(result.GetOutput())
    else:
        return ""


def iblog(debugger, command, context, result, internal_dict):
    target = context.GetTarget()
    module = target.module["UIKit"]
    section = _find_section(module, "__TEXT", "__cstring")
    load_address = section.GetLoadAddress(target)
    end_address = load_address + section.GetByteSize()

    command = """memory find --count 1 --string \
'Could not load the "%@" image referenced from a nib in the bundle \
with identifier "%@"' {} {}""".format(hex(load_address), hex(end_address))

    output = _output_for_command(debugger, command)
    string_addr = _extract_address_from(output)
    debugger.HandleCommand(
        "br set --name NSLog --condition '(void *)[$arg1 cString] == {}'"
        .format(string_addr))


def __lldb_init_module(debugger, internal_dict):
    handle = debugger.HandleCommand
    handle("command script add -f iblog.iblog iblog")