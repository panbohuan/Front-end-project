  // 模拟图片数据
        const images = [
            { id: 1, src: "https://picsum.photos/300/400?random=1" },
            { id: 2, src: "https://picsum.photos/300/500?random=2" },
            { id: 3, src: "https://picsum.photos/300/350?random=3" },
            { id: 4, src: "https://picsum.photos/300/450?random=4" },
            { id: 5, src: "https://picsum.photos/300/380?random=5" },
            { id: 6, src: "https://picsum.photos/300/420?random=6" },
            { id: 7, src: "https://picsum.photos/300/480?random=7" },
            { id: 8, src: "https://picsum.photos/300/360?random=8" },
            { id: 9, src: "https://picsum.photos/300/440?random=9" },
            { id: 10, src: "https://picsum.photos/300/390?random=10" },
            { id: 11, src: "https://picsum.photos/300/410?random=11" },
            { id: 12, src: "https://picsum.photos/300/470?random=12" },
            { id: 13, src: "https://picsum.photos/300/430?random=13" },
            { id: 14, src: "https://picsum.photos/300/460?random=14" },
            { id: 15, src: "https://picsum.photos/300/370?random=15" },
            { id: 16, src: "https://picsum.photos/300/420?random=16" },
            { id: 17, src: "https://picsum.photos/300/380?random=17" },
            { id: 18, src: "https://picsum.photos/300/450?random=18" },
            { id: 19, src: "https://picsum.photos/300/410?random=19" },
            { id: 20, src: "https://picsum.photos/300/390?random=20" }
        ];

        // 生成瀑布流内容
        function generateMasonry() {
            const masonryContainer = document.getElementById('masonry');
            
            // 循环创建每个图片元素
            images.forEach(image => {
                // 创建图片容器
                const item = document.createElement('div');
                item.className = 'masonry-item';
                item.dataset.id = image.id; // 设置图片ID
                
                // 创建图片元素
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = '图片';
                img.className = 'masonry-img';
                
                // 创建保存按钮
                const saveBtn = document.createElement('div');
                saveBtn.className = 'save-btn';
                saveBtn.textContent = '保存';
                
                // 创建操作按钮
                const actionButtons = document.createElement('div');
                actionButtons.className = 'action-buttons';
                
                const uploadBtn = document.createElement('div');
                uploadBtn.className = 'action-btn';
                uploadBtn.innerHTML = '<i class="fas fa-upload"></i>';
                
                const moreBtn = document.createElement('div');
                moreBtn.className = 'action-btn';
                moreBtn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
                
                // 将按钮添加到操作按钮容器
                actionButtons.appendChild(uploadBtn);
                actionButtons.appendChild(moreBtn);
                
                // 将所有元素添加到图片容器
                item.appendChild(img);
                item.appendChild(saveBtn);
                item.appendChild(actionButtons);
                
                // 将图片容器添加到瀑布流
                masonryContainer.appendChild(item);
            });
        }

        // 侧边栏按钮点击功能
        function setupSidebarButtons() {
            // 获取按钮和面板元素
            const createBtn = document.getElementById('create-btn');
            const updateBtn = document.getElementById('update-btn');
            const messageBtn = document.getElementById('message-btn');
            
            const createPanel = document.getElementById('create-panel');
            const updatePanel = document.getElementById('update-panel');
            const messagePanel = document.getElementById('message-panel');
            
            let activePanel = null; // 记录当前打开的面板
            
            // 创建按钮点击事件
            createBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                togglePanel(createPanel); // 切换面板显示/隐藏
            });
            
            // 更新按钮点击事件
            updateBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                togglePanel(updatePanel);
            });
            
            // 消息按钮点击事件
            messageBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                togglePanel(messagePanel);
            });
            
            // 切换面板显示/隐藏的函数
            function togglePanel(panel) {
                if (activePanel === panel) {
                    // 如果点击的是已打开的面板，则关闭它
                    panel.style.display = 'none';
                    activePanel = null;
                } else {
                    // 隐藏所有面板
                    document.querySelectorAll('.sidebar-panel').forEach(p => {
                        p.style.display = 'none';
                    });
                    
                    // 显示当前面板
                    panel.style.display = 'block';
                    activePanel = panel;
                }
            }
            
            // 点击页面其他区域关闭面板
            document.addEventListener('click', function() {
                if (activePanel) {
                    activePanel.style.display = 'none';
                    activePanel = null;
                }
            });
            
            // 阻止面板内的点击事件冒泡，防止点击面板内部时关闭面板
            document.querySelectorAll('.sidebar-panel').forEach(panel => {
                panel.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        }

        // 图片详情功能
        function setupImageDetail() {
            // 获取详情页面相关元素
            const imageDetail = document.getElementById('image-detail');
            const detailImage = document.getElementById('detail-image');
            const backButton = document.getElementById('back-button');
            const likeButton = document.getElementById('like-button');
            const commentsList = document.getElementById('comments-list');
            const commentInput = document.getElementById('comment-input');
            const submitComment = document.getElementById('submit-comment');
            
            let liked = false; // 记录点赞状态
            let comments = []; // 存储评论的数组
            
            // 为瀑布流图片添加点击事件监听
            document.addEventListener('click', function(e) {
                // 检查点击的是否是图片容器
                const masonryItem = e.target.closest('.masonry-item');
                if (masonryItem) {
                    // 获取被点击图片的ID和URL
                    const imageId = masonryItem.dataset.id;
                    const imageSrc = masonryItem.querySelector('.masonry-img').src;
                    showImageDetail(imageId, imageSrc); // 显示图片详情
                }
            });
            
            // 显示图片详情的函数
            function showImageDetail(imageId, imageSrc) {
                detailImage.src = imageSrc; // 设置详情图片的URL
                liked = false; // 重置点赞状态
                likeButton.classList.remove('liked'); // 移除点赞样式
                likeButton.innerHTML = '<i class="far fa-heart"></i><span>点赞</span>'; // 重置点赞按钮
                
                comments = []; // 清空评论
                renderComments(); // 渲染评论列表
                
                imageDetail.style.display = 'flex'; // 显示详情页面
                document.querySelector('.masonry-area').style.display = 'none'; // 隐藏瀑布流区域
            }
            
            // 返回按钮点击事件
            backButton.addEventListener('click', function() {
                imageDetail.style.display = 'none'; // 隐藏详情页面
                document.querySelector('.masonry-area').style.display = 'block'; // 显示瀑布流区域
            });
            
            // 点赞按钮点击事件
            likeButton.addEventListener('click', function() {
                liked = !liked; // 切换点赞状态
                if (liked) {
                    // 如果点赞了，添加样式和图标
                    likeButton.classList.add('liked');
                    likeButton.innerHTML = '<i class="fas fa-heart"></i><span>已点赞</span>';
                } else {
                    // 如果取消点赞，移除样式和图标
                    likeButton.classList.remove('liked');
                    likeButton.innerHTML = '<i class="far fa-heart"></i><span>点赞</span>';
                }
            });
            
            // 提交评论按钮点击事件
            submitComment.addEventListener('click', function() {
                const commentText = commentInput.value.trim(); // 获取评论内容并去除首尾空格
                if (commentText) {
                    // 如果有评论内容，添加到评论数组
                    comments.push({
                        author: "当前用户", // 评论作者
                        text: commentText  // 评论内容
                    });
                    
                    commentInput.value = ''; // 清空输入框
                    renderComments(); // 重新渲染评论列表
                }
            });
            
            // 渲染评论列表的函数
            function renderComments() {
                commentsList.innerHTML = ''; // 清空评论列表
                
                // 循环创建每个评论元素
                comments.forEach(comment => {
                    // 创建评论容器
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    
                    // 创建评论作者元素
                    const authorElement = document.createElement('div');
                    authorElement.className = 'comment-author';
                    authorElement.textContent = comment.author;
                    
                    // 创建评论内容元素
                    const textElement = document.createElement('div');
                    textElement.className = 'comment-text';
                    textElement.textContent = comment.text;
                    
                    // 将作者和内容添加到评论容器
                    commentElement.appendChild(authorElement);
                    commentElement.appendChild(textElement);
                    
                    // 将评论容器添加到评论列表
                    commentsList.appendChild(commentElement);
                });
            }
        }

        // 页面加载完成后初始化所有功能
        document.addEventListener('DOMContentLoaded', function() {
            generateMasonry(); // 生成瀑布流
            setupSidebarButtons(); // 设置侧边栏按钮功能
            setupImageDetail(); // 设置图片详情功能
        });