class SimpleForm extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = SimpleForm.template();
    }

    static template() {
        return `
            <style>
                form {
                    margin-top: 40px;
                    width: 300px;
                }
                .form-field {
                    margin-bottom: 20px;
                    display: flex;
                    flex-direction: column;simple-chart
                }
                
                .form-field label {
                    margin-bottom: 5px;
                }
                
                .form-field input {
                    height: 30px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                
                .submit {
                  text-align: center;
                }
                
                .submit button {
                    padding: 2px 12px;
                    background: #ddd;
                    margin: 20px;
                    padding: 7px 30px;
                    border-radius: 5px;
                    color: #000;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
            <form id="simple-form" novalidate>
                <div class="form-field">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required>
                </div>
                <div class="form-field">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" required>
                </div>
                <div class="submit">
                    <button type="submit">Login</button>
                </div>
            </form>
        `;
    }

}

customElements.define('simple-form', SimpleForm);