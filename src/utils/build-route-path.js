// /users/:id

export function buildRoutePath(path){
  // verificando se existe o símbolo de 2 pontos juntamente com letras de a-z e A-Z, o + representa que pode se repetir várias vezes
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  

  // console.log(Array.from(path.matchAll(routeParametersRegex)))


  // validando se começa com o pathWithParams

  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex;
}