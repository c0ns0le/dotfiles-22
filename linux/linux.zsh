# Make sure we're not on OS X
if [[ "$OSX" == true ]];then
  return
fi

if which nautilus &> /dev/null;then
  alias o="nautilus"
fi
