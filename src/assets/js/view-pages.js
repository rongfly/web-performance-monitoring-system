new Vue({
    el: '#pages',
    data: function(){
        return{
            listdata:[],
            pageNo:1,
            pageSize:config.pageSize,
            totalNum:0,
            slow:util.getQueryString('type'),
        }
    },
    filters:{
        toFixed:window.Filter.toFixed
    },
    mounted(){
        this.getinit();
    },
    methods:{
        getinit(){
            let api = ''

            if(this.slow&&this.slow=='slow'){
                api = 'api/slowpages/getSlowpagesList'
            }else{
                api = 'api/pages/getPageList'
            }

            util.ajax({
                url:config.baseApi+api,
                data:{
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    beginTime:'',
                    endTime:'',
                },
                success:data => {
                    if(!data.data.datalist&&!data.data.datalist.length)return;
                    this.listdata = data.data.datalist;
                    new Page({
                         parent: $("#copot-page"),
                         nowPage: this.pageNo,
                         pageSize: this.pageSize,
                         totalCount: data.data.totalNum,
                         callback:(nowPage, totalPage) =>{
                             this.pageNo = nowPage;
                             this.getinit();
                         }
                     });
                }
            })
        },
        gotodetail(item){
            if(this.slow&&this.slow=='slow'){
                util.setStorage('session','slowpagesItemData',JSON.stringify(item))
                location.href="/slowpages/detail?type=zane"
            }else{
                util.setStorage('session','pagesItemData',JSON.stringify(item))
                location.href="/pages/detail?type=zane"
            }
        }
    }
})