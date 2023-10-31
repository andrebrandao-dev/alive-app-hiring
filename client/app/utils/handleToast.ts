import Swal from 'sweetalert2';

type Params = {
  response: any,
  title?: string | 'ops :(',
  timer?: number | 5000,
  icon?: string | 'error',
  position?: string | 'top-end',
}

export default function handleError(params: Params) {
  console.log(params);
  const { data }  = params.response;

  Swal.fire({
    toast: true,
    title: 'ops :(',
    text: data.message,
    position: 'top-end',
    showConfirmButton: false,
    icon: 'error',
    timer: 5000,
  })
}