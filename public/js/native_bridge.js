var tdh007 = window.tdh007 || {};
window.tdh007.invokeNative = (name, args, callback) =>
{
  var tempCallback = callback || null
  if (window.tdh007.handleSpecialEvent(name, args, tempCallback)) {
    return
  }
  if (window.AndroidFunction) {
    var params = window.tdh007.handleAndroidFunction(name, args)
    return window.tdh007.androidHandler(name, params, tempCallback)
  } else if (window.tdhutruck) {
    var params = window.tdh007.handleiOSFunction(name, args)
    window.tdh007.iOSHandler(name, params, tempCallback)
  }
}
window.tdh007.androidHandler = (name, params, tempCallback) =>
{
  if (!window.AndroidFunction[name]) {
    console.log('错误：不能找到方法' + name)
    return
  }
  var result;
  if (params) {
    result = window.AndroidFunction[name](params)
  } else {
    result = window.AndroidFunction[name]()
  }
  if (null !== tempCallback){tempCallback(result);}
  // window.tdh007.callback(params, result)
}
window.tdh007.iOSHandler = (name, params, tempCallback) =>
{
  if (!window.tdhutruck[name]) {
    console.log('错误：不能找到方法' + name)
    return
  }
  window.tdhutruck[name](params, (result) => {
    if (null !== tempCallback){tempCallback(result);}
    window.tdh007.callback(params, result)
  })
}
window.tdh007.callback = (params, result) =>
{
  if (params === null || params === undefined) {
    return
  }
  var name = null
  if (typeof(params) === 'object') {
    name = params.callbackFnName
  } else if (typeof(params) === 'string') {
    name = JSON.parse(params).callbackFnName
  }
  if (name !== undefined && name !== null) {
    window[name](JSON.stringify(result));
  }
}
window.tdh007.handleAndroidFunction = (name, args) =>
{
  if (args === null || args === undefined) {
    return null
  }
  if (typeof (args) === 'string') {
    if (args.length === 0) {
      return null
    }
    return args
  }
  return JSON.stringify(args);
}
window.tdh007.handleiOSFunction = (name, args) =>
{
  return args;
}
window.tdh007.handleSpecialEvent = (name, args, tempCallback) =>
{
  var isSpecialEvent = false
  var actions = ['setAttribute', 'getAttributeList', 'callPhone', 'getLocation', 'openWebView']
  if (name === actions[0]) {
    if (window.AndroidFunction) {
      isSpecialEvent = true
      for (var key in args) {
        console.log('key = ' + key + ', value = ' + args[key])
        window.AndroidFunction[name](key, args[key])
      }
    }
  }
  else if (name === actions[1]) {
    isSpecialEvent = true
    var results = {}
    if (window.AndroidFunction) {
      for (var name in args[0]) {
        var value = window.AndroidFunction["getAttribute"](name)
        console.log(name + '=' + value)
        // results.push(value)
        results[name] = value
      }
      if (null !== tempCallback){tempCallback(results);}
    } else if (window.tdhutruck) {
      window.tdh007.iOSHandler("getAttribute", args, (results) => {
        if (null !== tempCallback){tempCallback(results[0]);}
      })
    }
  }
  // else if (name === actions[2]) {
  //   if (window.AndroidFunction) {
  //     isSpecialEvent = true
  //     window.AndroidFunction["dialPhoneNumber"](args)
  //   }
  // }
  else if (name === actions[3]) {
    if (window.AndroidFunction) {
      isSpecialEvent = true
      var locationResult = window.AndroidFunction["getLocation"]()
      var locations = locationResult.split(',')
      window.tdh007.callback(args, {'cordType': 'BD09', 'lat': locations[0], 'lon': locations[1]})
    }
  }
  else if (name === actions[4]) {
    if (window.AndroidFunction) {
      isSpecialEvent = true
      var webUrl = args['webUrl'] || ''
      var canRefresh = args['canRefresh'] || 'false'
      var hidesNavigationBar = !(args['hidesNavigationBar'] || false)
      var otherInfo = {'offonTitle': hidesNavigationBar}
      window.AndroidFunction.openWebView(webUrl, canRefresh, JSON.stringify(otherInfo))
    }
  }
  return isSpecialEvent
}
window.tdh007.isNative = () => {
  return (window.AndroidFunction || window.tdhutruck)
}
window.tdh007.isIOS = () => {
  return window.tdhutruck !== undefined
}
window.tdh007.isAndroid = () => {
  return window.AndroidFunction !== undefined
}
