// This script stores the state of the checklists in cookies so the user can re-open on a later date
window.onload = function () {
  let page = null;

  if (document.getElementsByClassName('long').length > 0) {
    // If we're on the long.html page 
    page = 'long';

    // Could be changed to a for loop but this seems fine for the short list
    document.getElementById('ov').checked = getCookie('long_ov') === 'true' ? 1 : 0;
    document.getElementById('bsn').checked = getCookie('long_bsn') === 'true' ? 1 : 0;
    document.getElementById('bank').checked = getCookie('long_bank') === 'true' ? 1 : 0;
    document.getElementById('digid').checked = getCookie('long_digid') === 'true' ? 1 : 0;
    document.getElementById('insurance').checked = getCookie('long_insurance') === 'true' ? 1 : 0;

  } else if (document.getElementsByClassName('short').length > 0) {
    // If we're on the short.html page 
    page = 'short';

    // Could be changed to a for loop but this seems fine for the short list
    document.getElementById('ov').checked = getCookie('short_ov') === 'true' ? 1 : 0;
    document.getElementById('bank').checked = getCookie('short_bank') === 'true' ? 1 : 0;
  }

  // Get every checkbox in a ul on the long and short page
  const nodes = document.querySelectorAll('.long ul input[type="checkbox"], .short ul input[type="checkbox"]');

  nodes.forEach((node) => {
    node.addEventListener('change', (event) => {
      const target = event.target
      const label = `${page}_${target.id}`;

      if (target.checked) {
        // Set a cookie if the checkbox has been checked
        setCookie(label, 'true')
      } else {
        // Remove the cookie if the checkbox has been unchecked
        deleteCookie(label);
      }
    });
  });
};

function setCookie(name, value, days = 365) {
  // Create a UTC string for when the cookies should expire
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

  // Store the cookie
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) {
  var array = document.cookie.split(";");

  // Loop through every cookie
  for (let i = 0; i < array.length; i++) {
    // A pair consists of the cookie name and value
    const pair = array[i].split("=");

    if (name === pair[0].trim()) {
      // Decode and return the value if the cookie name matches the parameter name
      return decodeURIComponent(pair[1]);
    }
  }

  return null;
}

function deleteCookie(name) {
  if (getCookie(name)) {
    // Set the cookie to nothing and change the expiry date to the lowest allowed value so it expires
    document.cookie = `${name}=;;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Strict`;
  }
}
