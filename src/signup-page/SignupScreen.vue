<script>
import ProfileService from "@/services/ProfileService.js";
import RegisterService from "@/services/RegisterService.js";

export default {
  name:"SignUpScreen",
  data(){
    return{
      email:null,
      password:null,
      passwordRepeat:null,
      phoneNumber:null,
      name:null,
      address:null,
      gender:null,
      //error
      emailError: null,
      passwordError: null,
      passwordRepeatError: null,
      phoneError:null,
      nameError:null,
      addressError:null,
      genderError:null,
      //password
      showPassword: false,
      passwordFieldType: 'password',
      showPasswordRepeat: false,
      passwordRepeatFieldType: 'password',
      //list
      //valid
      valid: 1,
    }
  },
  created(){
    //this.fetchDataProfiles();
    //validation
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordRepeat();
    this.validatePhone();
    this.validateName();
    this.validateAddress();
  },
  mounted(){

  },
  methods:{
    //validation
    validateEmail(){
      if(!this.email){
        this.emailError='';
      }else
      {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
          this.emailError = 'Vui lòng nhập email hợp lệ.';
        } else {
          //customers.filter(customer => customer.email === emailToCompare)
          //check email ton tai
          // if (this.profiles.filter(p => p.email === this.email).length > 0) {
          //   this.emailError = 'Email đã tồn tại';
          // } else {
          //   this.emailError = '';
          // }
          this.emailError = '';
        }
      }
    },
    validatePassword(){
      if(!this.password){
        this.passwordError='';
      }else{
        if (!/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(this.password)) {
          this.passwordError = 'Mật khẩu gồm chữ, số, kí tự đặc biệt, không khoảng trắng, từ 6-15 kí tự. Vd: khan123@.';
        } else {
          this.passwordError = '';
        }
      }
    },
    validatePasswordRepeat(){
      if (this.password !== this.passwordRepeat) {
        this.passwordRepeatError= 'Mật khẩu không khớp.';
      } else {
        this.passwordRepeatError = '';
      }
    },
    validatePhone(){
      if(!this.phoneNumber){
        this.phoneError='';
      }else{
        if (isNaN(this.phoneNumber)) {
          this.phoneNumber = this.phoneNumber.slice(0, -1);
        }
        if(this.phoneNumber.length<10){
          this.phoneError='Vui lòng nhập số điện thoại 10 chữ số.';
        }else{
          this.phoneError='';
        }
      }
    },
    validateName(){
      if(!this.name){
        this.nameError='';
      }else{
        if (!/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,10}$/.test(this.name)) {
          this.nameError = 'Tên không hợp lệ.';
        } else {
          this.nameError = '';
        }
      }
    },
    validateAddress(){
      if(!this.address){
        this.addressError='';
      }else{
        if (!/^[a-zA-Z0-9\s,'/]*$/.test(this.address)) {
          this.addressError = 'Địa chỉ không hợp lệ.';
        } else {
          this.addressError = '';
        }
      }
    },
    async getEmailFetchProfileByEmail(email){
      let profileCheck=null;
      await ProfileService.getProfileByEmail(email).then(response => {
        profileCheck = response.data;
        //console.log('Profile check from API: ',profileCheck);
      }).catch(error => {
        console.error(error);
      });
      return profileCheck;
    },
    async getPhoneNumberFetchProfileByPhoneNumber(phoneNumber){
      let profileCheck=null;
      await ProfileService.getProfileByPhoneNumber(phoneNumber).then(response => {
        profileCheck = response.data;
        //console.log('Profile check from API: ',profileCheck);
      }).catch(error => {
        console.error(error);
      });
      return profileCheck;
    },
    async getIdMaxProfile(){
      let profileMax=null;
      await ProfileService.getProfileByIdMax().then(response => {
        profileMax = response.data;
        //console.log('Profile check from API: ',profileCheck);
      }).catch(error => {
        console.error(error);
      });
      return profileMax.id;
    },
    getDateNow(){
      return new Date();
    },
    async postRegisters(){
      const newRegister = {
        //nho +1 nha ong gia
        email: this.email.trim(),
        // "2024-07-20T15:30:50",
        //VN là GMT+7
        date_signup: new Date(this.getDateNow().getTime() + 7 *60 *60 * 1000)
      };
      try {
        await RegisterService.createRegister(newRegister)
        console.log('Thêm thông tin đăng kí thành công')
      } catch (error) {
        console.error('Error creating :', error)
      }
    },
    async checkAndSignUp() {
      let profileCheckEmail=null;
      let profileCheckPhoneNumber=null;
      if (!this.email) {
        this.emailError = "Vui lòng nhập email.";
        this.valid = 0;
      }

      if (!this.password) {
        this.passwordError = "Vui lòng nhập mật khẩu.";
        this.valid = 0;
      }
      if (!this.passwordRepeat) {
        this.passwordRepeatError = "Vui lòng nhập lại mật khẩu.";
        this.valid = 0;
      }

      if (!this.phoneNumber) {
        this.phoneError = "Vui lòng nhập số điện thoại.";
        this.valid = 0;
      }
      if (!this.name) {
        this.nameError = "Vui lòng nhập tên.";
        this.valid = 0;
      }
      if (!this.address) {
        this.addressError = "Vui lòng nhập địa chỉ.";
        this.valid = 0;
      }
      if (!this.gender) {
        this.genderError = "Vui lòng nhập giới tính.";
        this.valid = 0;
      }
      profileCheckEmail=await this.getEmailFetchProfileByEmail(this.email.trim());
      console.log('Profile check: ',profileCheckEmail);
      if(profileCheckEmail){
        this.emailError = "Email đã tồn tại.";
        profileCheckEmail=null;
        this.valid = 0;
      }
      profileCheckPhoneNumber=await this.getPhoneNumberFetchProfileByPhoneNumber(this.phoneNumber.trim());
      if(profileCheckPhoneNumber){
        this.phoneError = "Số điện thoại đã tồn tại.";
        profileCheckPhoneNumber=null;
        this.valid = 0;
      }
      if (!this.emailError &&
          !this.passwordError &&
          !this.passwordRepeatError &&
          !this.phoneError &&
          !this.nameError &&
          !this.addressError
      ) {
        this.valid = 1;
      }
      if (this.valid === 1) {
        async function sha512(password) {
          let buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(password));
          return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
        }
        let idMax=await this.getIdMaxProfile();
        console.log('Id max: ',idMax);
        const newProfile = {
          //nho +1 nha ong gia
          id: idMax,
          email: this.email,
          password: await sha512(this.password),
          phoneNumber: this.phoneNumber,
          //hash password
          //password: String(sha512(this.password)),
          name: this.name,
          address: this.address,
          gender: this.gender,
          access: false,
        };
        //console.log(newProfile);
        try {
          await ProfileService.createProfile(newProfile);
          //Cập nhật vào bản ghi
          await this.postRegisters();
          this.resetField();
          alert('Đăng kí thành công.')
          this.$router.replace({ path: '/loginScreen' }).catch((error) => { console.error('Error navigating :', error); });
        } catch (error) {
          console.error('Error creating :', error)
          alert('Error creating. Please try again.')
        }
      }
    },
    resetField(){
      this.email='';
      this.password='';
      this.passwordRepeat='';
      this.phoneNumber='';
      this.name='';
      this.address='';
      this.gender='';
      this.showPassword=false;
      this.showPasswordRepeat=false;
    },
    preventPaste(event) {
      event.preventDefault();
    },
  },
  watch: {
    showPassword(newValue) {
      this.passwordFieldType = newValue ? 'text' : 'password';
    },
    showPasswordRepeat(newValue) {
      this.passwordRepeatFieldType = newValue ? 'text' : 'password';
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Đăng ký</h3>
            <form >
              <div class="form-group">
                <label>Email</label>
                <input type="email"
                       class="form-control"
                       placeholder="Nhập email"
                       v-model="email"
                       maxlength="40"
                       @input="validateEmail()"
                >
              </div>
              <span style="color: red">{{emailError}}</span>
              <div class="form-group">
                <label>Mật khẩu</label>
                <input :type="passwordFieldType"
                       class="form-control"
                       placeholder="Nhập mật khẩu"
                       v-model="password"
                       maxlength="15"
                       @input="validatePassword()"
                       @paste="preventPaste($event)"
                >
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" v-model="showPassword">
                <label class="form-check-label" for="showPassword">Hiện mật khẩu</label>
              </div>
              <span style="color: red">{{passwordError}}</span>
              <div class="form-group">
                <label>Nhập lại mật khẩu</label>
                <input :type="passwordRepeatFieldType"
                       class="form-control"
                       placeholder="Nhập lại mật khẩu"
                       v-model="passwordRepeat"
                       maxlength="15"
                       @input="validatePasswordRepeat()"
                       @paste="preventPaste($event)"
                >
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" v-model="showPasswordRepeat">
                <label class="form-check-label" for="showPasswordRepeat">Hiện mật khẩu</label>
              </div>
              <span style="color: red">{{passwordRepeatError}}</span>
              <div class="form-group">
                <label>Số điện thoại</label>
                <input type="text"
                       class="form-control"
                       placeholder="Nhập số điện thoại"
                       v-model="phoneNumber"
                       maxlength="10"
                       @input="validatePhone()"
                >
              </div>
              <span style="color: red">{{phoneError}}</span>
              <div class="form-group">
                <label>Tên</label>
                <input type="text"
                       class="form-control"
                       placeholder="Nhập tên"
                       v-model="name"
                       maxlength="30"
                       @input="validateName()"
                >
              </div>
              <span style="color: red">{{nameError}}</span>
              <div class="form-group">
                <label>Địa chỉ</label>
                <input type="text"
                       class="form-control"
                       placeholder="Nhập địa chỉ"
                       maxlength="30"
                       v-model="address"
                       @input="validateAddress()"
                >
              </div>
              <span style="color: red">{{addressError}}</span>
              <div class="form-group" style="display: flex;">
                <label for="email">Gender:</label>
                <div style="margin-left: 10px;display: flex">
                  <div style="margin-right: 10px">
                    <input type="radio" value="Male" v-model="gender" ref="maleRadio">
                    <label for="male" style="margin-left: 5px">Male</label>
                  </div>
                  <div style="margin-right: 10px">
                    <input type="radio" value="Female" v-model="gender" ref="femaleRadio">
                    <label for="female" style="margin-left: 5px">Female</label>
                  </div>
                  <div style="margin-right: 10px">
                    <input type="radio" value="Other" v-model="gender" ref="otherRadio">
                    <label for="other" style="margin-left: 5px">Other</label>
                  </div>
                </div>
              </div>
              <span v-if="!gender" style="color: red">{{genderError}}</span>
            </form>
            <div class="text-center" style="margin-top: 10px">
              <button type="submit" class="btn btn-primary" @click="checkAndSignUp">Đăng ký</button>
              <router-link to="/loginScreen" class="btn btn-link">Đăng nhập tài khoản</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: column;
  height: 820px;
  width: 2280px;
  margin-top: -20px;
  padding: 0;
  margin-left: 10px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-left: 100px;
  width: 500px;
  margin-top: 20px;
}

.btn-link {
  color: #007bff;
  text-decoration: none;
}

.btn-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>