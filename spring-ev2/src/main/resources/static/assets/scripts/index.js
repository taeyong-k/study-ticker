const $tickerForm = document.getElementById("tickerForm");
const $tickerTable = document.getElementById("tickerTable");


const loadTickers = () => {
    const $tbody = $tickerTable.querySelector(':scope > tbody');
    $tbody.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert(`[${xhr.status}] 메모를 작성하지 못하였습니다. 잠시 후 다시 시도해 주세요.`);
            return;
        }
        const tickers = JSON.parse(xhr.responseText);
        let tbodyHtml = '';
        for (const ticker of tickers) {
            tbodyHtml += `
                <tr>
                    <th scope="row">${ticker['id']}</th>
                    <td>${ticker['name']}</td>
                    <td>
                        <button class="deleteButton" name="delete" type="button" data-id="${ticker['id']}">삭제</button>
                    </td>
            </tr>`
        }
        $tbody.innerHTML = tbodyHtml;

        $tbody.querySelectorAll('button[name="delete"]').forEach(($button) => {
            $button.addEventListener('click', () => {
                if (confirm('정말 메모를 삭제하겠습니까?') === true) {
                    deleteTicker($button.dataset['id']);
                }
            });
        });
    };
    xhr.open('GET', '/ticker/tickers');
    xhr.send();
}

const deleteTicker = (index) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('index', index);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert(`[${xhr.status}] 메모를 삭제하지 못하였습니다. 잠시 후 다시 시도해 주세요.`);
            return;
        }
        const response = JSON.parse(xhr.responseText);
        switch (response['result']) {
            case 'success':
                alert('메모를 성공적으로 삭제 하였습니다.');
                loadTickers();
                break;
            default:
                alert('알 수 없는 이유로 삭제 하지 못하였습니다. 잠시 후 다시 시도해주세요.');
        }
    };
    xhr.open('DELETE', '/ticker/');
    xhr.send(formData);
}


$tickerForm.onsubmit = (e) => {
    e.preventDefault();
    const id = $tickerForm['id'].value;
    const name = $tickerForm['name'].value;
    if (id.length === 0) {
        alert('id를 입력해 주세요.');
        $tickerForm['id'].focus();
        return;
    }
    if (id.length > 5 || id.length < 1) {
        alert('id의 길이는 1자 이상, 5자 미만 이여야 합니다.');
        $tickerForm['id'].focus();
        return;
    }
    if (name.length === 0) {
        alert('이름을 입력해 주세요.');
        $tickerForm['name'].focus();
    }
    if (name.length > 100 || name.length < 1) {
        alert('이름의 길이는 1자 이상, 100자 미만 이여야 합니다.');
        $tickerForm['name'].focus();
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert(`[${xhr.status}] 메모를 등록하지 못하였습니다. 잠시 후 다시 시도해 주세요.`);
            return;
        }
        const response = JSON.parse(xhr.responseText);
        switch (response['result']) {
            case 'failure':
                alert('알 수 없는 이유로 등록에 실패하였습니다.');
                break;
            case 'failure_duplicate_id':
                alert('등록 신청한 id가 중복되었습니다. 다른 id를 입력해주세요.');
                $tickerForm['id'].focus();
                $tickerForm['id'].select();
                break;
            case 'success':
                $tickerForm['id'].value = '';
                $tickerForm['name'].value = '';
                $tickerForm['id'].focus();
                loadTickers();
                break;
            default:
                alert('알 수 없는 이유로 등록 하지 못하였습니다. 잠시 후 다시 시도해주세요.')
        }
    };
    xhr.open('POST', '/ticker/');
    xhr.send(formData);
};

loadTickers();
