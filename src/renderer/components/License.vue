<template>
<div>
  <div class="bg">
  </div>
  
  <b-modal id="licenseModal" ref="licenseModal" 
      title="Activate your game" 
      ok-title="Activate"
      ok-only
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      @ok="activate">
      <p class="my-4">
        Please enter your license key for Jaxi the Robot. It should be found in the email you used to purchase the game. If you still need to purchase a license key, <a href="http://www.jaxitherobot.com" target="_blank">go here</a>.
      </p>
      <p class="my-4 error" v-html="errorMessage">
      </p>
      <b-form-input type="text" v-model="licenseKey" placeholder="enter your key here" />
    </b-modal>

    <b-modal id="playModal" ref="playModal" 
      title="Activated!" 
      ok-title="Let's Play!"
      ok-only
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      @ok="playGame">
      <p class="my-4">
        Thank you for activating Jaxi the Robot! Have fun, and learn to code!
      </p>
    </b-modal>

</div>

</template>

<script>
  import router from '../router'
  import axios from 'axios'

  export default {
    name: 'license',
    components: { },
    data () {
      return {
        licenseKey: null,
        errorMessage: null
      }
    },
    mounted () {
      this.$refs.licenseModal.show()
    },
    methods: {
      async activate(evt)
      {
        evt.preventDefault() //modal close block
        if(await this.checkLicenseKey(this.licenseKey))
        {
          localStorage.setItem('licenseKey', this.licenseKey)
          this.$refs.licenseModal.hide()
          this.$refs.playModal.show()
        } else {
          //we should have an error message set by now.
        }
      },
      async checkLicenseKey(key)
      {
        var success = false
        await axios
          .post('https://api.gumroad.com/v2/licenses/verify',
          {
            product_permalink: "jaxitherobot",
            license_key: key,
            //increment_uses_count: "false" // for testing
          })
          .then(response => {
            if(response.data.success)
            {
              if(Number(response.data.uses) < 4)
              {
                success = true
              } else {
                success = false
                this.errorMessage = "It looks like that license key is has already been used on another computer. Please contact us at <a href='mailto:support@jaxitherobot.com'>support@jaxitherobot.com</a>, with the email you used to purchase the game, and we can help you out."
              }
            } else {
              success = false
              this.errorMessage = "It looks like that license key is invalid. Please try again. If you continue to experience problems, contact us at <a href='mailto:support@jaxitherobot.com'>support@jaxitherobot.com.</a>"
            }
          })
          .catch(error => {
            success = false
            this.errorMessage = "It looks like that license key is invalid. Please try again. If you continue to experience problems, contact us at <a href='mailto:support@jaxitherobot.com'>support@jaxitherobot.com.</a>"
          })

          return success;
      },
      playGame ()
      {
        router.push('landing-page')
      }

    }
  
  }
</script>

<style>

@font-face {
  font-family: Righteous;
  src: url('~@/assets/fonts/Righteous-Regular.ttf');
}


body, html { 
  font-family: 'Source Sans Pro', sans-serif;
}

.bg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-image: url('~@/assets/title.jpg');
  background-size:cover;
  background-repeat: no-repeat;
  background-position-x: center;
  width: 100%;
  height: 100%;
  opacity: .25;
}
  
.license-form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.error
{
  color: red;
  font-size: 13px;
}

.logo{
  width: 50%;
}

</style>
