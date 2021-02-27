export default class Data {
  // Helper function that helps with the Fetch calls with an Autorization Header
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(path, options);
  }

  async getUser(username, password) {
    const response = await this.api(`http://localhost:5000/api/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error('Something went wrong...');
    }
  }

  async createUser(user) {
    const response = await this.api(`http://localhost:5000/api/users`, 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error('Something went wrong...');
    }
  }

  async createCourse(course, username, password) {
    try {
      const response = await this.api(`http://localhost:5000/api/courses`, 'POST', course, true, { username, password });
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          return data.errors;
        });
      }
    } catch (err) {
      throw new Error('Something went wrong...');
    }
  }

  async updateCourse(course, username, password) {
    const response = await this.api(`http://localhost:5000/api/courses/${course.id}`, 'PUT', course, true, { username, password });
    if (response.status === 201) {
      return [];
    } else if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error('Something went wrong...');
    }
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`http://localhost:5000/api/courses/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 201 || response.status === 204) {
      return [];
    }
    else if (response.status === 400 || response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error('Something went wrong...');
    }
  }
}