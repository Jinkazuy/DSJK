// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'

import {url_getHomeNewsList} from '@/utils/http_req_list.js'

let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'

// 获取首页新闻列表
// 返回 OBJ
export const http_getHomeNewsList = async function (page) {

	let offset = 5
	let limit = 5
	let pageObj = {}
	await http.get(url_getHomeNewsList, {params:{
		page,
		limit
	}}).then(res => {
			console.log('-----------------')
			console.log(res.data)
			if(res.data.code === 0) {
				pageObj =  res.data.page
			}
		})
	return pageObj

	// 新闻内容数据结构↓
	// createTime: "2020-01-15 15:42:14"
	// dataSort: 0
	// id: 1
	// isDelete: 0
	// newsAuthor: "神译局"
	// newsContent: "&amp;nbsp;神译局是36氪旗下编译团队，关注科技、商业、职场、生活等领域，重点介绍国外的新技术、新观点、新风向。编者按：投资人是最接近预言家的人，在 2020 年这个重要的年份，硅谷顶级投资人 Fred Wilson 写下了自己对未来十年的思考和预测，在他眼中，未来十年世界会发生什么样的变化？有哪些新的领域值得关注？一起来阅读。文章译自 Fred Wilson 的博客 AVC，原标题为 What will happen in the 2020s。我最喜欢比尔·盖茨的一句话：“<strong>人们往往高估了一年内发生的事情，却低估了未来十年内发生的事情。</strong>”对人类而言，未来十年非常重要。在未来的十年里，我们需要找到一直萦绕在我们心中的问题的答案。我是一个乐观主义者，我相信人们有直面挑战的勇气，也有找到解决方案的智慧。所以，对于2020年这个开局之年，我持乐观的态度。以下是我对未来十年的展望。1、气候危机迫在眉睫，就像两次世界大战爆发的前夜。应对气候危机需要各国、各机构调动各个领域重新配置资金，对抗全球变暖。未来十年，我们会看到：资本将重新配置；碳排放征税政策收紧，世界上大多数国家，包括美国在内，都将对碳排放征税；受气候变化影响严重的地区，其房地产价格将出现暴跌；因气候变暖而受益的地区，其房地产价格会出现上涨；未来，大量的资本将会投资用于保护关键地区和基础设施；核能将在全球范围内复兴，尤其是那些更容易建造、操作更安全的小型反应堆将会大受欢迎；到2030年，全球太阳能装机容量将从目前的650 GW增加到2万GW以上。所有这些事情都将会导致资本市场更加关注气候问题并为其提供资金，而用于其他领域的资金将会减少。2、自动化将继续降低我们赖以生存和生产的许多服务和系统的运营成本。谁将获得如此巨大的消费者剩余，将决定未来十年的政治格局。我们将看到资本主义会受到越来越多的审视，为了更公平地重新分配财富和收入而进行的试验将产生新一代的世界领导人，他们将在这股浪潮中备受欢迎。3、中国将凭借其技术实力和快速适应新变化的能力，成为世界上占主导地位的全球超级大国。相反，美国将变得越来越注重内部事务和孤立主义。4、各国将发行并推广本国的数字/加密版本法定货币，中国将成为第一个吃螃蟹的国家，并从中受益最多。美国因为受到监管的束缚，行动迟缓，从而让其它国家和地区在加密领域占据领先地位。亚洲的加密资产交易所由于不会受到欧洲和美国繁琐的监管限制，通过利用去中心化的金融技术，将成为所有类型金融工具的主要资本市场。5、去中心化的互联网将会出现，最初的呈现形式是去中心化的基础设施服务，如存储、带宽、计算等。去中心化的消费级应用程序发展是缓慢的，杀手级的消费级应用程序直到2025年以后才会出现。6、十年后，植物性饮食将主宰世界。吃肉将成为一种稀有的佳肴，就像今天吃鱼子酱一样。世界上大部分的粮食生产将从农场转移到实验室。7 .对外太空的探索和商业化将由私营公司主导，因为各国政府不愿在该领域进行投资。在未来十年的前几年，将产生一波对太空商业的炒作和投资，但投资回报是缓慢的，到2030年，人们将处在对太空商业的幻想破灭的低谷。8、政府和公司的大规模监测将成为常态，预计在未来十年中，人们将越来越多地求助于新产品和新服务，以保护自己不受监测。未来十年，最大的消费级科技产品将出现在隐私领域。9、我们最终将告别婴儿潮一代掌握着美国和世界各地话语权的时代，千禧一代和 Z 世代将在2030年掌管大量公司或机构。股东、选民和其他利益相关者将不再看重人的年龄和经验，而更看重远见和勇气。10、遗传学的不断进步将在未来十年中大获成功，癌症和其他不治之症会被更好地认识和治疗。生育情况也将发生重大改变。然而，遗传学也会产生新的疾病和道德/伦理问题，使社会变得混乱。平衡好遗传学带来的得与失将是我们在未来十年中面临的最大挑战。以上十个预测，对现在来说足够了，对我来说也足够了。我希望这篇文章能引发你的思考，这是这篇文章的目的。这些预测不可能都是正确的，但重要的是你要思考这些问题。&amp;nbsp;译者：杨志芳"
	// newsDate: "2020-01-15 12:56:06"
	// newsImgUrl: "https://pic.36krcnd.com/avatar/201906/14092708/q42867125b5hasjf!120"
	// newsSource: "36kr"
	// newsSourceId: 1
	// newsSourceUrl: "http://localhost:8080"
	// newsStatus: 1
	// newsTitle: "硅谷顶级投资人 Fred Wilson 的未来十年预测"
	// newsType: 1
	// status: 0
	// updateTime: "2020-01-15 15:42:14"
	
	
 //  let list = [
	// 	{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '222',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '333',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '444',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '5',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '6',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '7',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '8',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '9',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '10',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '11',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '12',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '13',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '14',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '15',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '16',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	},{
	// 		title: '武汉不明原因肺炎增长至59例，SARS已被排除SARS已被排除SARS已被排除SARS已被排除SARS已被排被排被排被排被排被排除',
	// 		info: '武汉卫健委针对本次不明原因肺炎时间发出最新通告通告通告通告通告',
	// 		id: '111',
	// 		imgUrl: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png'
	// 	}
	// ]
	// return list.slice((page-1)*offset,page*offset)

	
	
	
  // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;
	// http.get(url_getPhone,{params:{
 //      encryptedData,
	// 		iv
 //    }}).then(res => {
	// http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
			
	// // 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
	// // http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {
		
	// 	// 由于不是vue组件,所以不能拿到this的vue实例,
	// 	// 所以这里操作store就用原始的方法,直接操作文件;
	// 	// 其他vue文件还是用...mutations映射方法操作
	// 	// console.log('换取用户手机号↓')
	// 	// console.log(res)
		
	// 	store.commit('setUserPhone', '18801228710')
	// 	// store.commit('setUserPhone', res.data.data.phoneNumber)
	// 	console.log(store.getters.store_UserPhone)
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	
}