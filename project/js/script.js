// 添加卡片点击跳转
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
    if (!e.target.closest('.project-author')) {
      window.location.href = this.dataset.href;
    }
  });
});

// 添加作者信息展示
document.querySelectorAll('.project-author').forEach(authorElement => {
  const detailsElement = authorElement.querySelector('.author-details');

  authorElement.addEventListener('mouseenter', function () {
    detailsElement.style.opacity = '1';
    detailsElement.style.visibility = 'visible';
    detailsElement.style.transform = 'translateY(0)';
  });

  authorElement.addEventListener('mouseleave', function () {
    detailsElement.style.opacity = '0';
    detailsElement.style.visibility = 'hidden';
    detailsElement.style.transform = 'translateY(10px)';
  });
});

// 实现懒加载和动画效果
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'cardAppear 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = 0;
  observer.observe(card);
});

// 添加鼠标悬停效果
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-12px) scale(1.05)';
    this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.3)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  });
});

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 添加滚动到顶部按钮
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 添加技术标签动画
document.querySelectorAll('.tech-tag').forEach(tag => {
  tag.addEventListener('mouseover', function () {
    this.style.transform = `translateY(-3px) rotate(${Math.random() * 10 - 5}deg)`;
  });
  tag.addEventListener('mouseout', function () {
    this.style.transform = 'translateY(0) rotate(0deg)';
  });
});

// 添加项目标题动画
document.querySelectorAll('.project-title').forEach(title => {
  title.addEventListener('mouseover', function () {
    this.style.transform = 'translateX(10px) scale(1.05)';
    this.style.color = '#FFA500';
  });
  title.addEventListener('mouseout', function () {
    this.style.transform = 'translateX(0) scale(1)';
    this.style.color = '';
  });
});

// 添加页面加载动画
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});


// 搜索功能
const searchInput = document.querySelector('.search-input');
const projectCards = document.querySelectorAll('.project-card');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.trim().toLowerCase(); // 使用 trim() 去除首尾空格
  projectCards.forEach(card => {
    const cardContent = card.textContent.toLowerCase();
    if (searchTerm === '' || cardContent.includes(searchTerm)) {
      card.style.display = 'block';
      highlightText(card, searchTerm);
    } else {
      card.style.display = 'none';
    }
  });
});

// 高亮搜索结果
function highlightText(element, searchTerm) {
  element.querySelectorAll('.project-title, .project-description, .tech-tag, .project-author span').forEach(el => {
    const originalText = el.textContent;
    if (searchTerm && searchTerm.length > 0) {
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      el.innerHTML = originalText.replace(regex, match => `<span class="highlight">${match}</span>`);
    } else {
      el.innerHTML = originalText; // 如果搜索词为空，恢复原始文本
    }
  });
}

// 过滤分类功能
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    const filter = this.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    projectCards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 添加过滤按钮动画
filterButtons.forEach(button => {
  button.addEventListener('mouseover', function () {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  button.addEventListener('mouseout', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});


