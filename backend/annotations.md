# ANNOTATIONS

## GENERAL

I have to get in another project the same helpers and others. Maybe in the future it will be better to create a microservice or package and then import it. That way even the older code will get updates.

## JWT Secret key

In order to generate run this command at terminal

```shell
# INPUT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# OUTPUT
21547cc228555cca932cd05172d801beae00df2a70167e21df34f522978f7030
```
