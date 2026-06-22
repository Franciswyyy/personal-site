const { createApp } = Vue;

createApp({
  components: {
    "project-card": {
      props: ["project"],
      template: `
        <li class="project-card">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <span>{{ project.category }}</span>
          <button @click="$emit('select', project)">选择项目</button>
        </li>
      `,
    },
  },

  data() {
    return {
      title: "Vue Counter",
      count: 0,
      showProjects: true,
      visitorName: "",
      messageDraft: "",
      nextMessageId: 1,
      messages: [],
      selectedProjectName: "",
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

  mounted() {
    this.loadMessages();
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

    selectProject(project) {
      this.selectedProjectName = project.name;
    },

    saveMessage() {
      const text = this.messageDraft.trim();

      if (text === "") {
        return;
      }

      this.messages.push({
        id: this.nextMessageId,
        name: this.visitorName.trim() || "匿名访客",
        text,
      });

      this.nextMessageId += 1;
      this.visitorName = "";
      this.messageDraft = "";

      // Keep the side effect explicit: this action changes messages, then saves them.
      this.saveMessagesToStorage();
    },

    clearMessages() {
      this.messages = [];
      this.nextMessageId = 1;

      // Clearing the page state should also clear the persisted browser copy.
      this.saveMessagesToStorage();
    },

    loadMessages() {
      // localStorage stores strings, so saved message arrays need JSON.parse.
      const savedMessages = localStorage.getItem("vue-demo-messages");

      if (!savedMessages) {
        return;
      }

      this.messages = JSON.parse(savedMessages);
      this.nextMessageId = Math.max(...this.messages.map((message) => message.id), 0) + 1;
    },

    saveMessagesToStorage() {
      // Convert the messages array to a string before storing it in the browser.
      localStorage.setItem("vue-demo-messages", JSON.stringify(this.messages));
    },
  },
}).mount("#app");
