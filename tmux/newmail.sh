# Show the number of unread messages from a maildir directory

run_segment() {
    dirs="$HOME/.mail/*/INBOX/new/"

    new=$(find $dirs -type f | wc -l | xargs)
    if [[ $new -gt 0 ]];then
        echo $new
    fi
}
