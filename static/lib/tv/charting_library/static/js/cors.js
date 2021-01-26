(function () {
  var host = window.location.host
  var splitChar = '.'
  var dotArr = host.split(splitChar)
  if (dotArr.length > 2) {
    var domain = dotArr.slice(1).join(splitChar)
    // document.domain = domain
  }
})()
