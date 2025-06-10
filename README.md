# 📌 Ticker Manager

## 🗂 프로젝트 개요
간단한 티커 등록/관리 시스템을 학습 목적으로 제작하였습니다.  
ID와 이름을 입력하여 티커를 등록하고, 등록된 목록을 테이블 형식으로 확인 및 삭제할 수 있습니다.

---

## 🚀 주요 기능

- 🆔 티커 등록: ID(1~5자), 이름(1~100자) 입력 후 등록
- 📋 등록된 티커 목록 확인 (페이지 접속 시 즉시 표시)
- ❌ 티커 삭제 기능 (등록된 항목에 대한 동작 버튼)
- ✅ 입력값 유효성 검사 및 비동기 처리
- 📡 비동기 등록 및 목록 갱신 (페이지 새로고침 없이)

---

## 🛠 사용 기술

- **IDE**: IntelliJ IDEA
- **Language**: Java 17
- **Framework**: Spring Boot 3.4.4  
  - ✅ Spring Web  
  - ✅ Spring Boot DevTools  
  - ✅ Lombok  
  - ✅ Thymeleaf (Template Engine)
- **Database**: MariaDB
- **ORM/DB 연동**:  
  - ✅ Spring Data JDBC  
  - ✅ JDBC API  
  - ✅ MyBatis Framework
- **Frontend**: HTML, CSS, JavaScript (모두 외부 파일 분리)
- **Build Tool**: Maven (WAR 패키지)

---

## 💻 화면 구성

- 폼(form)은 화면 중앙 고정
  - 가로: `30rem` 고정
  - 세로: 최대 `80vh`, 초과 시 스크롤바 자동 표시
- ID 입력 시 자동 포커스
- CSS 및 JS는 모두 외부 파일로 관리 (HTML 내 `style`, `script` 금지)
- 테이블 형식으로 등록된 티커(ID, 이름, 삭제 버튼) 표시

---

## 📚 학습 포인트

- HTML5 표준 및 시멘틱 구조 구성
- 입력값 검증 (ID, 이름 길이 체크)
- `XMLHttpRequest` + `FormData` 통한 비동기 요청 처리
- 서버와의 JSON 형식 응답 처리
- 오류 대응 (중복 ID, 실패 등) → 사용자 피드백 제공
- 페이지 리로딩 없이 목록 실시간 갱신

---

## ▶ 실행 방법

1. MariaDB에 테이블 생성  
   (제공된 `.sql` 또는 직접 쿼리 실행)

2. `application.properties` 또는 `application.yml` 설정:
   ```properties
   spring.datasource.url=jdbc:mariadb://localhost:3306/your_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
