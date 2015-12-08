// Alternate between h/m Objective-C files with 'a'
function alternate(URL) {
  var newURL = null;
  if (URL.endsWith(".h")) {
    newURL = URL.replaceLast("m");
  } else if (URL.endsWith(".m")) {
    newURL = URL.replaceLast("h");
  }

  if (newURL) {
    window.location.href = newURL;
  }
}

String.prototype.replaceLast = function(character) {
  return this.substr(0, this.length - 1) + character;
};

$(document).keypress(function(e) {
  // Exit early if we're in an input field
  // This wasn't needed in Chrome but is in Safari
  if (document.activeElement.nodeName === "INPUT") {
    return;
  }

  // The letter 'a'
  var aPressed = (e.which == 97 ? true : false);
  if (aPressed) {
    alternate(window.location.href);
  }
});

// Actions on pageload

$(document).ready(function() {
  removeDislikedElements();
  removeMostLabels();
  addHideDiffButton();
  addIssueButtons();
});

// Observe changes to re-add custom issue buttons after page changes
function registerIssueButtonMutations() {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer) {
    var buttons = $("#custom_button");
    if (buttons.length === 0) {
      addIssueButtons();
    }
  });

  observer.observe(document, {
    subtree: true,
    attributes: true
  });
}

// Remove some buttons GitHub adds that I don't want to click
function removeDislikedElements() {
  $(".js-new-blob-submit").remove();
  $("a[href^=github-mac]").remove();
  $("button:contains('Update branch')").remove();
}

// Remove distracting labels from some repos
function removeMostLabels() {
  var url = document.URL
  if (url.toLowerCase().indexOf("lyft/lyft") <= 0) {
    return;
  }

  $(".label.tooltipped").each(function() {
    if ($(this).text() !== "Approved - Awaiting QA") {
      $(this).remove();
    }
  });
}

// Add a button to 'fold' a file in diff mode (super nice for storyboards!)
function addHideDiffButton() {
  $(".file-actions").each(function() {
    var diff = $(this).parent().parent();
    var link = $("<a href=\"#\" class=\"btn btn-sm\">Hide</a>");
    $(this).prepend(link);
    link.click(function() {
      var codeArea = $(diff).find('[class$="wrapper"]');
      $(this).html() == 'Hide' ? codeArea.hide() : codeArea.show()
      $(this).html($(this).html() == 'Show' ? 'Hide' : 'Show');
      return false;
    });
  });
}

function addIssueButtons() {
  commentContainer = $(".timeline-new-comment");
  if (commentContainer === undefined) {
    return;
  }

  textArea = commentContainer.find("textarea");
  actions = commentContainer.find(".form-actions #partial-new-comment-form-actions")[0];

  var labelButton = newButton("<img src='https://a248.e.akamai.net/assets.github.com/images/icons/emoji/+1.png' width='14' height='14'>L", ":+1:", textArea);
  actions.appendChild(configureLabelButton(labelButton));
  actions.appendChild(newButton("<img src='https://a248.e.akamai.net/assets.github.com/images/icons/emoji/+1.png' width='14' height='14'>", ":+1:", textArea));
  actions.appendChild(newButton("<img src='https://a248.e.akamai.net/assets.github.com/images/icons/emoji/beers.png' width='14' height='14'>", ":beers:", textArea));
  actions.appendChild(newButton("Merge?", "Can we merge this or mark it as awaiting QA?", textArea));
  actions.appendChild(newButton("Trunk", "We have just launched 'Trunk', which is the new way for you to submit your Pods. For more information on this have a read through the post at http://blog.cocoapods.org/CocoaPods-Trunk/ If you have previously had your Pod merged into the master repository, please ensure you claim your Pod http://blog.cocoapods.org/Claim-Your-Pods/", textArea));
  actions.appendChild(newButton("Unver", "We cannot update unversioned specs (specs that point to a commit). If you'd like to add a new version the repository would have to be tagged. If you would like to use a different commit in your own project you can use some flags in your `Podfile` documented [here](http://guides.cocoapods.org/syntax/podfile.html#pod)", textArea));
}

// Show the labels dialog, select the right label, close it
function configureLabelButton(button) {
  button.addEventListener("click", function(event) {
    event.stopPropagation();

    setTimeout(function() {
      $(".sidebar-labels").find("button")[0].click();
      setTimeout(function() {
        $('input[type="checkbox"][value="keith"]')[0].click();
        $("body").click();
      }, 200);
    }, 750);
  });

  return button
}

// Create generic buttons which change the value of the given textArea
function newButton(title, actionText, textArea) {
  if (actionText === null) {
    actionText = title;
  }

  var button = document.createElement("button");
  button.innerHTML = title;
  button.className = "btn";
  button.id = "custom_button";
  button.setAttribute("type", "submit");
  button.setAttribute("title", title);
  button.addEventListener("click", function(event) {
    textArea.val(actionText);
  });

  return button;
}
