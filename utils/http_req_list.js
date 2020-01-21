
// URL汇总

// # 路由前缀
export const baseUrl = 'http://10.0.0.142:9999'


// # 首次登录 & 获取token
export const  url_login_getToken = '/app/wx/login'

// # 当前登录用户信息
export const  url_getUserInfo = '/app/user/info'

// # 获取手机号
export const  url_getPhone = '/app/wx/phoneNumber'

// # 发送用户4项基本信息
export const  url_setUserBaseSign = '/app/save/info'

// # 设置身高表中, 该用户的身高
export const  url_setUserHeight = 'x'

// # 设置体重表中, 该用户的体重
export const  url_setUserWeight = '/app/measure/mensweight/save'

// # 获取用户所有体征数据
export const url_getUserSignData = '/x'

// # 获取首页banner列表
export const url_getHomeBannerList = '/x'

// # 获取首页新闻列表
export const url_getHomeNewsList = '/app/news/list'

// # 获取解析后的微信步数
export const url_getWXStep = '/x'

// # 获取数据库中,该用户的步数,这个步数不一定是最新的
export const url_getStep = '/x'

// # 获取用户体重
export const url_getUserWeight = '/app/measure/mensweight/info/'

// # 获取用户血压
export const url_getUserbloodPressure = '/app/measure/mensbloodpressure/info/'

// # 获取用户血糖
export const url_getUserbloodSugar = '/app/measure/mensbloodsugar/info/'




// # 设置用户血压
export const url_setUserBloodPressure = '/app/measure/mensbloodpressure/save'