# Vue Task Planner Java Backend

Spring Boot backend for the Vue Task Planner learning project.

## Tech Stack

- Java 17
- Spring Boot 3
- Maven
- Spring Web
- Spring Data JPA
- H2 file database

## Run

```bash
/Users/wy/Documents/cs/config/apache-maven-3.8.8/bin/mvn \
  --settings /Users/wy/Documents/cs/config/apache-maven-3.8.8/conf/settings.xml \
  spring-boot:run
```

## H2

The database is stored under the project folder:

```text
./data/task-planner.mv.db
```

H2 console:

```text
http://localhost:8080/h2-console
```

JDBC URL:

```text
jdbc:h2:file:./data/task-planner;AUTO_SERVER=TRUE;MODE=MySQL
```

User:

```text
sa
```

Password is empty.

## API

```text
GET  /api/tasks                 查询任务列表
GET  /api/tasks/detail?id=1     查询任务详情
POST /api/tasks/create          新增任务
POST /api/tasks/update          修改任务
POST /api/tasks/delete          删除任务
POST /api/tasks/toggle-status   切换完成状态
```

Create example:

```bash
curl -X POST http://localhost:8080/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{"title":"学习 Spring Boot API","category":"Java","priority":"HIGH","note":"先跑通后端链路"}'
```

Update example:

```bash
curl -X POST http://localhost:8080/api/tasks/update \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"学习 Spring Boot API 调用","category":"Java","priority":"MEDIUM","note":"更新任务内容"}'
```

Delete example:

```bash
curl -X POST http://localhost:8080/api/tasks/delete \
  -H "Content-Type: application/json" \
  -d '{"id":1}'
```

Toggle status example:

```bash
curl -X POST http://localhost:8080/api/tasks/toggle-status \
  -H "Content-Type: application/json" \
  -d '{"id":1}'
```
