const todos = [
  {tno:1, title:'몸만들기', writeday:'2024-05-01', finish:false},
  {tno:2, title:'현질하기', writeday:'2024-07-20', finish:true}
];
let tno = 3;

console.log(JSON.stringify(todos));

const $tbody = $('#tbody');

const render = ()=>{
  $tbody.empty();
  for(const todo of todos) {
    const row =`
      <tr>
        <td>${todo.tno}</td>
        <td class="${todo.finish?'finish':''}">${todo.title}</td>
        <td>${todo.writeday}</td>
        <td>
          <button class="toggle btn ${todo.finish?'btn-success':'btn-info'}" data-tno='${todo.tno}'>
            ${todo.finish?'완료':'작업중'}
          </button>
        </td>
        <td>
          <button class='delete btn btn-danger' data-tno='${todo.tno}'>삭제</button>
        </td>
      </tr>
    `
    $tbody.append(row);
  }
}

render();

$('#addBtn').click(function() {
  const title = $('#title').val();
  if(title=='') {
    alert('할일을 입력하세요');
    return;
  }
  const newTodo = {tno:tno++, title:title, writeday:new Date().toLocaleDateString(), finish:false};
  todos.push(newTodo);
  render();
});

$('#tbody').on('click', '.toggle', function() {
  const tno = $(this).data('tno');
  for(const todo of todos) {
    if(todo.tno==tno) {
      todo.finish = !todo.finish;
    }
  }
  render();
});

$('#tbody').on('click', '.delete', function() {
   // todos.splice(배열의 인덱스, 삭제할 개수)
  const tno = $(this).data('tno');
  for(let i=0; i<todos.length; i++) {
    if(todos[i].tno==tno) {
      todos.splice(i, 1);
    }
  }
  render();
});
