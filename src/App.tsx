import Routes from "./routes";
import ToastStore from "@/stores/toastStore";
import {Toast} from "@/components/Toast";

function App() {

    return (
        <ToastStore>
            <Toast/>
            <Routes/>
        </ToastStore>
    )
}

export default App
