class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getUser() {
    return fetch(`${this._baseUrl}/profile`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  };

  getAllUsers() {
    return fetch(`${this._baseUrl}/users`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  }

  getAllDepartments() {
    return fetch(`${this._baseUrl}/departments`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  }

  getContent() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  };

  postTestResults(test, testDate, name, department, studyingDepartment, studyingLesson, mistakesList) {
    return fetch(`${this._baseUrl}/testresult`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test,
        testDate,
        name,
        department,
        studyingDepartment,
        studyingLesson,
        mistakesList
      }),
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  }

  // getTestResultByDepartment(department) {
  //   return fetch(`${this._baseUrl}/testresult/${department}`, {
  //     headers: this._headers,
  //     credentials: 'include',
  //   })
  //   .then((res) => this._getResponseData(res));
  // }

  getTestResults() {
    return fetch(`${this._baseUrl}/testresult`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  }

  login(name, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password,
      }),
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  };

  register(name, department, password, confirmation) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {name, department, password, confirmation} ),
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  };

  addData(department, lessonName, cn, eng, example) {
    return fetch(`${this._baseUrl}/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {department, lessonName, cn, eng, example} ),
      credentials: 'include'
    })
  .then((res) => this._getResponseData(res));
  };

  deleteWord(departmentId, lessonId, wordId) {
    return fetch(`${this._baseUrl}/${departmentId}/${lessonId}/${wordId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  };

  deleteLesson(departmentId, lessonId) {
    return fetch(`${this._baseUrl}/${departmentId}/${lessonId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  };

  deleteDepartment(departmentId) {
    return fetch(`${this._baseUrl}/${departmentId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  };

  changeDepartment(departmentId, newData) {
    console.log(departmentId, newData)
    return fetch(`${this._baseUrl}/${departmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        department: newData.cardName,
      })
    })
    .then((res) => this._getResponseData(res));
  };

  changeLesson(departmentId, lessonId, newData) {
    console.log(departmentId, lessonId, newData)
    return fetch(`${this._baseUrl}/${departmentId}/${lessonId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lessonName: newData.cardName,
      })
    });
  };

  changeWord(departmentId, lessonId, wordId, newData) {
    return fetch(`${this._baseUrl}/${departmentId}/${lessonId}/${wordId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cn: newData.cn,
        eng: newData.eng,
        example: newData.example
      })
    })
  }
};

const MainApi = new Api({
  baseUrl: 'http://api.leka-english.online'
  // baseUrl: 'http://localhost:3000'
});

export default MainApi;
  