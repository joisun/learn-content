import fetch from "node-fetch"
const GITHUB_TOKEN = "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"
const Config = {
    Url: "https://api.github.com/repos/jaycethanks/learn-content/actions/workflows",
    HeaderOptions: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + GITHUB_TOKEN,
        "X-GitHub-Api-Version": "2022-11-28"
    }
}

const fetchWorkflows = async () => {
    return new Promise((resolve) => {
        fetch(Config.Url, {
            method: "GET",
            headers: Config.HeaderOptions
        }).then(response => response.json()).then(data => {
            const workflows_id = [];
            if(!data.workflows){
                console.error("请求失败:",data.message, " ",data.documentation_url)
                process.exit(1)
            }
            
            for (let workflow of data.workflows) {
                workflows_id.push(workflow.id)
            }
            resolve(workflows_id)
        }).catch(err => console.log(err))
    })
}




function fetchAndPrintWorkflows() {
    fetchWorkflows().then(workflows_id => {
        // 清除之前的输出
        console.clear();
        console.log("fetching....")
        for (let workflow_id of workflows_id) {
            fetch(Config.Url + `/${workflow_id}/runs`, {
                method: "GET",
                headers: Config.HeaderOptions
            }).then(response => response.json()).then(data => {
                console.log('STATUS:', `${data.workflow_runs[0].name} - ${data.workflow_runs[0].status}`)
                if(data.workflow_runs[0].status === 'completed'){
                    clearInterval(timer);
                }
            }).catch(err => console.log(err))
        }
    })
}



// 立即执行一次，然后每20秒执行一次
let timer = setInterval(fetchAndPrintWorkflows, 20000);
fetchAndPrintWorkflows(); // 立即执行一次