// 这里的 getters， 只负责 将state中的数据，对外提供展示数据，
// 向外导出数据，只能展示不能修改；

// 用户信息(不含敏感信息)
export const store_UserInfo = state => state.store_UserInfo

// 用户详细数据,包后台数据表中的数据;
export const store_UserInfoData = state => state.store_UserInfoData

// 手机号
export const store_UserPhone = state => state.store_UserPhone

// token
export const store_token = state => state.store_token
// token 过期时间
export const store_tokenExpiration = state => state.store_tokenExpiration

// 用户基本体征数据(性别,出生日期,身高,体重)
export const store_userBaseSign = state => state.store_userBaseSign

// 用户所有准确体征数据
export const store_userSignData = state => state.store_userSignData

// 首页banner列表
export const store_homeBannerList = state => state.store_homeBannerList

// 首页新闻列表
export const store_homeNewsList = state => state.store_homeNewsList

// 微信步数
export const store_userWXStep = state => state.store_userWXStep