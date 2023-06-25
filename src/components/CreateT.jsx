
import styles from '@/assets/styles/Create.module.css'


export default function CreateT(){

   return(<div className={styles.maindiv}>
   <div className={styles.borderdiv}>
    <div> LET'S UPLOAD YOUR BEAT</div>
    <div>Image must not exceed 500KB in order for the event to be created succesfully</div>

    <form action="/send-data-here" method="post">
    <label for="beatname">Name of the beat</label>
    <input type="text" id="beatname" name="beatname" />
    <div>Preview Image</div>
    <div>Category</div>
    <div>Price</div>
    <button type="submit">Submit</button>
</form>
   </div>
   </div>)
}