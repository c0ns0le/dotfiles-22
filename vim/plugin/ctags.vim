autocmd VimEnter * call s:GenerateCtags()
function! s:GenerateCtags()
  let tagfile = 'tags'
  if exists("g:ctags_default_file")
    let tagfile = g:ctags_default_file
  else
    if filereadable('.tags')
      let tagfile = '.tags'
    endif
  endif

  let filepath = s:TopLevel() . tagfile
  let cmd = "ctags -f " . filepath
  if filereadable(filepath)
    let cmd .= ' --append ' . expand('%')
  else
    let cmd .= ' --recurse .'
  endif

  silent call system(cmd)
  let &tags .= (empty(&tags) ? '' : ',') . filepath
endfunction

function! s:TopLevel()
  if isdirectory('.git')
    return getcwd() . '/'
  endif

  let output = system('git rev-parse --show-toplevel')
  if v:shell_error == 0
    let output = substitute(output, "\\n", '', 'g')
    return output . '/'
  endif

  return ''
endfunction