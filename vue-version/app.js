const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "Vue Counter",
      count: 0,
      showProjects: true,
      visitorName: "",
      messageDraft: "",
      selectedCategory: "All",
      categories: ["All", "Frontend", "Writing", "Learning"],
      projects: [
        {
          id: 1,
          name: "Personal Site v1",
          description: "用原生 HTML、CSS、JavaScript 做的个人网站。",
          category: "Frontend",
        },
        {
          id: 2,
          name: "Build Log",
          description: "记录从后端走向全栈和独立产品开发的学习过程。",
          category: "Writing",
        },
        {
          id: 3,
          name: "Vue Demo",
          description: "用小例子理解 Vue 如何管理页面状态。",
          category: "Learning",
        },
      ],
    };
  },

  computed: {
    countMessage() {
      if (this.count === 0) {
        return "当前数字是 0，状态刚初始化。";
      }

      if (this.count > 0) {
        return "当前数字是正数。";
      }

      return "当前数字是负数。";
    },

    filteredProjects() {
      if (this.selectedCategory === "All") {
        return this.projects;
      }

      return this.projects.filter((project) => project.category === this.selectedCategory);
    },
  },

  methods: {
    increase() {
      this.count += 1;
    },

    decrease() {
      this.count -= 1;
    },

    reset() {
      this.count = 0;
    },

    toggleProjects() {
      this.showProjects = !this.showProjects;
    },

    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
}).mount("#app");
