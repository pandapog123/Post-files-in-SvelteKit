<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Upload images using SvelteKit</h1>

<form action="/?/uploadFile" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />

  <button>Submit file</button>
</form>

{#if form?.message}
  <p class="error-message">{form.message}</p>
{/if}

<style>
  .error-message {
    color: red;
  }
</style>
