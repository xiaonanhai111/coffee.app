<template>
    <div class="wrapper" ref="wrapper">
        <div class="content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
   data() {
      return {
        scroll:null
      }
   },
   props:{
    probeType:{
        type:Number,
        default:0
    },
    pullUpLoad:{
        type:Boolean,
        default:false
    },
    scrollX:{
        type:Boolean,
        default:false
    },
    eventPassthrough:{
        type:String,
        default(){
            return ''
        }
    }
   },
   created(){
   },
   computed:{
   },
   methods:{
    getContentWidth(a){
        this.$refs.content.style.width = a + 'px'
    },
    getRefresh(){
        this.scroll && this.scroll.refresh()
        // console.log(this.scroll.refresh);
    }
   },
   mounted() {
    this.$nextTick(()=>{    //this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行
    this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        tap:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        scrollX:this.scrollX,
        eventPassthrough:this.eventPassthrough     //当设置 eventPassthrough 为 'vertical' 的时候，scrollY 无效
    }),
    this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
    }),
    this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
    })
    
    })
   },
}
</script>
<style lang="css" scoped>

</style>
