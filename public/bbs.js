"use strict";

let number = 0;
const bbs = document.querySelector("#bbs");

document.querySelector("#post").addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    const params = {
        method: "POST",
        body: `name=${name}&message=${message}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    fetch("/post", params)
        .then((response) => {
            if (!response.ok) throw new Error("Error");
            return response.json();
        })
        .then(() => {
            document.querySelector("#message").value = "";
        });
});

document.querySelector("#check").addEventListener("click", () => {
    fetch("/check", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        .then((response) => {
            if (!response.ok) throw new Error("Error");
            return response.json();
        })
        .then((response) => {
            if (number != response.number) {
                fetch("/read", {
                    method: "POST",
                    body: `start=${number}`,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Error");
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        response.messages.forEach((mes) => addMessageToBoard(mes));
                    });
            }
        });
});

function addMessageToBoard(mes) {
    const cover = document.createElement("div");
    cover.className = "cover";
    cover.dataset.id = mes.id;

    const nameArea = document.createElement("span");
    nameArea.className = "name";
    nameArea.innerText = mes.name;

    const mesArea = document.createElement("span");
    mesArea.className = "mes";
    mesArea.innerText = mes.message;

    const likeArea = document.createElement("span");
    likeArea.className = "like";
    likeArea.innerText = `いいね (${mes.likes || 0})`;

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const likeButton = document.createElement("button");
    likeButton.innerText = "いいね";
    likeButton.addEventListener("click", () => {
        fetch(`/bbs/${mes.id}/like`, { method: "POST" })
            .then((response) => {
                if (!response.ok) throw new Error("Error");
                return response.json();
            })
            .then((data) => {
                likeArea.innerText = `いいね (${data.likes})`;
            });
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
        fetch(`/bbs/${mes.id}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) throw new Error("Error");
                return response.json();
            })
            .then(() => {
                cover.remove();
            });
    });

    const editButton = document.createElement("button");
    editButton.innerText = "編集";
    editButton.addEventListener("click", () => {
        const newMessage = prompt("新しいメッセージを入力してください", mes.message);
        if (newMessage) {
            fetch(`/bbs/${mes.id}`, {
                method: "PUT",
                body: `message=${newMessage}`,
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Error");
                    return response.json();
                })
                .then(() => {
                    mesArea.innerText = newMessage;
                });
        }
    });

    buttons.appendChild(likeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    cover.appendChild(nameArea);
    cover.appendChild(mesArea);
    cover.appendChild(likeArea);
    cover.appendChild(buttons);

    bbs.appendChild(cover);
}
