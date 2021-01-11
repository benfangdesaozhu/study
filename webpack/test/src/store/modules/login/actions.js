import { LOGIN_DATA } from './mutations'
export const actions = {
  logininfoAction(context,data){
    console.log('actions', `${LOGIN_DATA}`, context, data)
    context.commit(`${LOGIN_DATA}`, data)
  }
}