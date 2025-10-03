const images = [
            { id: 1, src: "https://picsum.photos/300/400?random=1", title: "美丽的风景", author: "摄影师A" },
            { id: 2, src: "https://picsum.photos/300/500?random=2", title: "城市夜景", author: "摄影师B" },
            { id: 3, src: "https://picsum.photos/300/350?random=3", title: "自然风光", author: "摄影师C" },
            { id: 4, src: "https://picsum.photos/300/450?random=4", title: "美食摄影", author: "摄影师D" },
            { id: 5, src: "https://picsum.photos/300/380?random=5", title: "旅行日记", author: "摄影师E" },
            { id: 6, src: "https://picsum.photos/300/420?random=6", title: "建筑设计", author: "摄影师F" },
            { id: 7, src: "https://picsum.photos/300/480?random=7", title: "动物世界", author: "摄影师G" },
            { id: 8, src: "https://picsum.photos/300/360?random=8", title: "艺术创作", author: "摄影师H" },
            { id: 9, src: "https://picsum.photos/300/440?random=9", title: "时尚潮流", author: "摄影师I" },
            { id: 10, src: "https://picsum.photos/300/390?random=10", title: "科技产品", author: "摄影师J" },
            { id: 11, src: "https://picsum.photos/300/410?random=11", title: "运动健身", author: "摄影师K" },
            { id: 12, src: "https://picsum.photos/300/470?random=12", title: "生活方式", author: "摄影师L" },
            { id: 13, src: "https://picsum.photos/300/430?random=13", title: "创意设计", author: "摄影师M" },
            { id: 14, src: "https://picsum.photos/300/460?random=14", title: "摄影技巧", author: "摄影师N" },
            { id: 15, src: "https://picsum.photos/300/370?random=15", title: "旅行攻略", author: "摄影师O" }
        ];

        // 生成瀑布流内容
        function generateMasonry() {
            const masonryContainer = document.getElementById('masonry');
            
            images.forEach(image => {
                const item = document.createElement('div');
                item.className = 'masonry-item';
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.title;
                img.className = 'masonry-img';
                
                const actions = document.createElement('div');
                actions.className = 'masonry-actions';
                
                const saveBtn = document.createElement('div');
                saveBtn.className = 'masonry-btn save';
                saveBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
                
                const moreBtn = document.createElement('div');
                moreBtn.className = 'masonry-btn';
                moreBtn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
                
                actions.appendChild(saveBtn);
                actions.appendChild(moreBtn);
                
                const info = document.createElement('div');
                info.className = 'masonry-info';
                
                const title = document.createElement('div');
                title.className = 'masonry-title';
                title.textContent = image.title;
                
                const author = document.createElement('div');
                author.className = 'masonry-author';
                
                const authorImg = document.createElement('img');
                authorImg.src = `https://picsum.photos/24/24?random=${image.id}`;
                authorImg.alt = image.author;
                
                const authorName = document.createElement('span');
                authorName.textContent = image.author;
                
                author.appendChild(authorImg);
                author.appendChild(authorName);
                
                info.appendChild(title);
                info.appendChild(author);
                
                item.appendChild(img);
                item.appendChild(actions);
                item.appendChild(info);
                
                masonryContainer.appendChild(item);
            });
        }

        // 页面加载完成后生成瀑布流
        document.addEventListener('DOMContentLoaded', generateMasonry);