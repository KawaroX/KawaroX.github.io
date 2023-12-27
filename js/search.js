
function set_image_size(image, width, height) 
{
    image.setAttribute("width", width + "px");
    image.setAttribute("height", height + "px");
}

function hexo_resize_image()
{
    var imgs = document.getElementsByTagName('img');
    for (var i = imgs.length - 1; i >= 0; i--) 
    {
        var img = imgs[i];

        var src = img.getAttribute('src').toString();

        var fields = src.match(/(?<=\?)\d*x\d*/g);
        if (fields && fields.length == 1)
        {
            var values = fields[0].split("x");
            if (values.length == 2)
            {
                var width = values[0];
                var height = values[1];

                if (!(width.length && height.length))
                {
                    var n_width = img.naturalWidth;
                    var n_height = img.naturalHeight;
                    if (width.length > 0)
                    {
                        height = n_height*width/n_width;
                    }
                    if (height.length > 0)
                    {
                        width = n_width*height/n_height;
                    }
                }
                set_image_size(img, width, height);
            }
            continue;
        }

        fields = src.match(/(?<=\?)\d*/g);
        if (fields && fields.length == 1)
        {
            var scale = parseFloat(fields[0].toString());
            var width = scale/100.0*img.naturalWidth;
            var height = scale/100.0*img.naturalHeight;
            set_image_size(img, width, height);
        }
    }
}
window.onload = hexo_resize_image;

// 获取文章内容div
const content = document.querySelector('.post-content'); 

// 查找内容里的所有img元素
const imgs = content.querySelectorAll('img');

// 遍历 img 添加 id 
imgs.forEach(img => {
  img.id = 'image';
});




// Global searchConfig

document.addEventListener('DOMContentLoaded', () => {


  document.addEventListener('keydown', (e) => {
    if(e.key === '/') {
      openSearchPopup();
    }
  });

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');

  const localSearch = new LocalSearch({
    path             : searchConfig.path,
    top_n_per_article: searchConfig.top_n_per_article,
    unescape         : searchConfig.unescape
  });

  if (searchConfig.preload) {
    // preload the search data when the page loads
    console.log("loading page");
    localSearch.fetchData();
  }

  function openSearchPopup() {
    document.querySelector('.search-popup').classList.add('search-activate');
    if (!localSearch.isfetched) {
      localSearch.fetchData();
    } 
  }

  function closeSearchPopup() {
    document.querySelector('.search-popup').classList.remove('search-activate');
    // refresh search box
    input.value = '';
    container.innerHTML = `<div class="search-result-message" ></div>`;
  }

  // open search box
  document.querySelector('.search-btn').addEventListener('click', openSearchPopup);


  // close search box
  document.querySelector('.search-popup-overlay').addEventListener('click', closeSearchPopup);
  document.querySelector('.search-close-btn').addEventListener('click', closeSearchPopup);

  function displaySearchResult() {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    if (searchText.length > 0) {
      resultItems = localSearch.getResultItems(keywords);
    }

    if (keywords.length === 1 && keywords[0] === '') {
      // no input
      container.innerHTML = `<div class="search-result-message" ></div>`
    } else if (resultItems.length === 0) {
      // no result
      container.innerHTML = `<div class="search-result-message" >No result found</div>`;
    } else {
      // display result(s)
      container.innerHTML = `
      <div class="search-result-message">${resultItems.length} result(s) found</div>
      <ul class="search-result-list">${resultItems.map(result => result.item).join('<div class="h-line-secondary"></div>')}
      </ul>`;
    }

  };

  if (searchConfig.trigger == 'auto') {
    // whenever there is input, update search result
    input.addEventListener('input', displaySearchResult);
  } else {
    // update search result when press "enter"
    input.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        displaySearchResult();
      }
    })
  }
  window.addEventListener('search:loaded', displaySearchResult);
});
  
// 菜单按钮代码
function toggleMenu() {
  var menuList = document.getElementsByClassName("menu-list")[0];
  var menuButton = document.getElementById("menu-btn");  
  if(menuList.classList.contains("active")){
    menuList.classList.remove("active");
    menuButton.innerHTML = "Menu";
  }else{
    menuList.classList.add("active");
    menuButton.innerHTML = "<div class=\"icon arrow-up\"> </div>";
  }
}

//////////////////////////////////////////////



///////////////////////////////

// 图片放大缩小效果



// saveAs(Blob/File/Url,fileType)

const images = document.querySelectorAll('img');
const overlay = document.getElementById('overlay');
const overlayImage = document.createElement('img');


const downloadBtn = document.createElement('button');
images.forEach(image => {

  image.addEventListener('click', () => {
    // 复制图片到遮罩层
    overlayImage.src = image.src;  
    overlay.appendChild(overlayImage);

    // 显示遮罩层
    overlay.style.opacity = 0;
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.opacity = 1; 
    }, 100);

    const downloadBtn = document.createElement('button');
    downloadBtn.classList.add('download-btn');
    downloadBtn.innerText = 'Download Image';
    // downloadBtn.classList.add('slidein-left');

    overlay.appendChild(downloadBtn);
    downloadBtn.addEventListener('click', () => {
      const imageURL = overlayImage.src;

      // 触发浏览器下载图片功能
      window.open(imageURL, 'image.jpg');
      
    });
  });


    // 点击遮罩层关闭
    overlay.addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.style.display = "none";
        downloadBtn.style.display = "none";
      }, 300);
    });
    
});

