### Olá

O teste foi desenvolvido com o conjunto dos frameworks **NestJS e NextJS**. Poderia ter utilizado para criar os endpoints o diretório api do NextJS, porém queria conhecer um pouco mais dos dois frameworks juntos então usei também o NestJS.

#### Backend

Para rodar:
```bash
$ cd serve
```

```bash
$  npm install
```

```bash
# development
$  npm run start
# watch mode
$  npm run start:dev
# production mode
$  npm run start:prod
```

#### Testes

4 testes possivelmente irão falhar pois eles dependem de uma APIKEY expirada, não consegui encontrar uma solução para sempre ter uma expirada, mas achei interessante ter esse teste pois é algo que deve ser tratado.

```bash
# unit tests
$  npm run test
```

#### Endpoints

` /dashboard/search/:keywords`
Retorna uma consulta na api com os primeiros 10 itens do resultado.

`/dashboard/quote/:symbol`
Retorna uma quote.

`/dashboard/quote/:symbol/gainloss?data_consulting=MM-DD-YYYY`
Retorna seu houve ganho ou perda em relação a data de consulta.

`/dashboard/history/:symbol/?start_date=MM-DD-YYYY&end_date=MM-DD-YYYY`
Retorna uma lista com os históricos de atividades no período enviado.

>Para fazer a comparação é utilizado o mesmo método que retorna a quote, porém isso é tratado pelo frontend.

####  Front End

No front utilizei TailwindUI + Sass, não cheguei a realizar os testes unitários pois priorizei os aspectos de responsividade e layout.

Para rodar:
```bash
$ cd client
```

```bash
$  npm install
```
```bash
$  npm run dev
# or
$ yarn dev
#or
$ pnpm dev
#or
$ bun dev
```
