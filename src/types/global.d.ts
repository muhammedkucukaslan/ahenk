type SuccessResult<T> = {
  success: true;
  data: T ;
}

type ErrorResult= {
  success: false;
  message: string;
  ERR_CODE: string;
}

type ApiResponse<T> = NextResponse<T>
type ApiError = NextResponse<{
  message: string
  ERR_CODE?: string
}>


type IResponse<T=null> = ApiResponse<T> | ApiError
type IResult<T = null> = SuccessResult<T> | ErrorResult