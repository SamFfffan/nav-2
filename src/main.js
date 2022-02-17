const $globalList = $('.globalList')
const $lastLi = $globalList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo:'G', url: 'https://github.com'},
    { logo:'D', url: 'https://developer.mozilla.org'},
    { logo:'I', url: 'https://www.iconfont.cn'},
    { logo:'R', url: 'http://ruanyifeng.com'},
];
const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')    // （正则表达式） 删除 / 开头的内容
} 

const render = ()=>{
    $globalList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)  => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>    
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-delete"></use>
            </svg>
        </div>
    </div> 
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
          window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()   // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()


$('.addButton').on('click', () => {
     let url = window.prompt('请问你要添加的网址是？');
     if(url.indexOf("http")!== 0){
         url = "https://" + url;
     }
     console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render()
});

 window.onbeforeunload = ()=>{
     console.log('页面要狗带了')
     const string = JSON.stringify(hashMap)
     localStorage.setItem('x', string)
 }

 $(document).on('keypress', (e)=>{
     const {key} = e
     for(let i =0 ;i<hashMap.length; i++){
         if(hashMap[i].logo.toLowerCase() === key){
             window.open(hashMap[i].url)
         }
     }
 })
 $(document).on('keypress', '.globalHeader',(e)=>{
   e.stopPropagation()
 })
 