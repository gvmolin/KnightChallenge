<template>
    <div class="login-container">
        <div class="login-card">
            <h1>Login</h1>


            <form action="" style="width: 100%;">
                <div class="modal-field" style="width: 100%;">
                    <h2>Username:</h2>
                    <input type="text" >
                </div>
                <div class="modal-field" style="width: 100%;">
                    <h2>Password:</h2>
                    <input type="text" >
                    <div class="forgot">
                        <button><p>forgot my password</p></button>
                    </div>
                    
                </div>

            </form>




            <div class="button-container">
                <button class="default-button"> Submit </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style>
.login-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--color2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    width: 40vw;
    height: 40vh;
    background-color: var(--color5);
    border-radius: var(--default-radius);
    box-shadow: var(--default-shadow);
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    padding: var(--default-padding);
    justify-content: space-between;
}

.login-card form {
    margin-top: 2vh;
}

.login-card button {
    padding: 0 2vh;
    background-color: var(--color1);
    color: var(--color5);
}

.forgot{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.login-card .forgot button {
    border: none;
    background-color: transparent;
    color: rgb(64, 64, 64);
    display: flex;
    justify-content: flex-end;
}

.button-container{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}



</style>