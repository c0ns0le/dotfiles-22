# Default Theme

TMUX_POWERLINE_SEPARATOR_LEFT_BOLD="◀"
TMUX_POWERLINE_SEPARATOR_LEFT_THIN="❮"
TMUX_POWERLINE_SEPARATOR_RIGHT_BOLD="▶"
TMUX_POWERLINE_SEPARATOR_RIGHT_THIN="❯"

TMUX_POWERLINE_DEFAULT_BACKGROUND_COLOR=${TMUX_POWERLINE_DEFAULT_BACKGROUND_COLOR:-'235'}
TMUX_POWERLINE_DEFAULT_FOREGROUND_COLOR=${TMUX_POWERLINE_DEFAULT_FOREGROUND_COLOR:-'255'}

TMUX_POWERLINE_DEFAULT_LEFTSIDE_SEPARATOR=${TMUX_POWERLINE_DEFAULT_LEFTSIDE_SEPARATOR:-$TMUX_POWERLINE_SEPARATOR_RIGHT_BOLD}
TMUX_POWERLINE_DEFAULT_RIGHTSIDE_SEPARATOR=${TMUX_POWERLINE_DEFAULT_RIGHTSIDE_SEPARATOR:-$TMUX_POWERLINE_SEPARATOR_LEFT_BOLD}


# Format: segment_name background_color foreground_color [non_default_separator]

if [ -z $TMUX_POWERLINE_LEFT_STATUS_SEGMENTS ]; then
    TMUX_POWERLINE_LEFT_STATUS_SEGMENTS=(
        #"tmux_session_info 148 234" \
        #"hostname 33 0" \
        #"ifstat 30 255" \
        #"ifstat_sys 30 255" \
        "wan_ip 24 255 ${TMUX_POWERLINE_SEPARATOR_RIGHT_THIN}" \
        "lan_ip 24 255 ${TMUX_POWERLINE_SEPARATOR_RIGHT_THIN}" \
        "vcs_branch 23 255" \
        "vcs_compare 60 255" \
        "vcs_staged 64 255" \
        "vcs_modified 9 255" \
        "vcs_others 245 0" \
    )
fi

if [ -z $TMUX_POWERLINE_RIGHT_STATUS_SEGMENTS ]; then
    TMUX_POWERLINE_RIGHT_STATUS_SEGMENTS=(
        #"earthquake 3 0" \
        #"pwd 89 211" \
        #"mailcount 9 255" \
        "newmail 236 250" \
        #"now_playing 234 37" \
        #"cpu 240 136" \
        #"load 237 167" \
        #"tmux_mem_cpu_load 234 136" \
        "battery 24 255" \
        #"weather 37 255" \
        #"rainbarf 0 0" \
        #"xkb_layout 125 117" \
        #"date_day 235 136" \
        #"date 235 136 ${TMUX_POWERLINE_SEPARATOR_LEFT_THIN}" \
        "time 235 136 ${TMUX_POWERLINE_SEPARATOR_LEFT_THIN}" \
        #"utc_time 235 136 ${TMUX_POWERLINE_SEPARATOR_LEFT_THIN}" \
    )
fi
