export default function ({ redirect, req, route }) {
  if (req) {
    let userAgent = req.headers['user-agent']
    if (userAgent.match(/Android|webOS|iPhone|iPod|iPad|BlackBerry/i)) {
      console.log(userAgent, route.path, route, '=======')
      if (route.path === '/') {
        // eslint-disable-next-line no-useless-escape
        console.log(route.path + '/mobile', route.query, '111')
        return redirect(route.path + 'mobile')
      } else if (route.path.includes('/mobile') < 0) {
        return redirect(route.path + '/mobile', route.query)
      }
    } else {
      let endIndex = route.path.indexOf('/mobile')
      if (endIndex === 0) {
        return redirect('/')
      } else if (endIndex > 0) {
        return redirect(route.path.slice(0, endIndex), route.query)
      }
    }
  } else {
    let userAgent = navigator.userAgent
    console.log(userAgent, route.path, route, '=======2222')
    if (userAgent.match(/Android|webOS|iPhone|iPod|iPad|BlackBerry/i)) {
      if (route.path === '/') {
        return redirect(route.path + 'mobile')
      } else if (route.path.includes('/mobile') === -1) {
        return redirect(route.path + '/mobile', route.query)
      }
    }
  }
}
