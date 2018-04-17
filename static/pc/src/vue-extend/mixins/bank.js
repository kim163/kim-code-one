import {validateBankNo} from "api/payment";
import check from "@/util/RegExp"
export let bank = {
  data(){
    return {
      old:"",
      banktxt:"",
      validateBankNo:true
    }
  },
  methods:{
    verifyBankNumber(val) {
      if (check.bank.test(val)) {
        this.old =val;
        validateBankNo({bankno:val}).then(data => {
          if (data.success && this.old == val) {
            this.banktxt = data.data;
            // this.validateBankNo = true;
          } else {
            this.banktxt = "";
            // this.validateBankNo = false;
          }
        });
      } else {
        this.banktxt = this.old = "";
        // this.validateBankNo = false;
      }
    }
  }
}
