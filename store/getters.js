// 这里的 getters， 只负责 将state中的数据，对外提供展示数据，
// 向外导出数据，只能展示不能修改；

// 用户信息(不含敏感信息)
export const store_UserInfo = state => state.store_UserInfo

// 手机号
export const store_UserPhone = state => state.store_UserPhone

// token
export const store_token = state => state.store_token

// 用户基本体征数据(性别,出生日期,身高,体重)
export const store_userBaseSign = state => state.store_userBaseSign