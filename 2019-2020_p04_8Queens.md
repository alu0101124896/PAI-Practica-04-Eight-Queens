# Práctica 4. Máquina expendedora
### Factor de ponderación: 6

#### Cobro y cambio en una máquina expendedora

Una máquina expendedora de alimentos tiene productos de tres tipos, A, B y C, que valen respectivamente 270€, 340€ y 390€. 
La máquina acepta y devuelve como cambio monedas de 1€ y 2€, además de 1 , 2, 5, 10, 20 y 50 céntimos.

Escriba un programa que solicite al usuario (por línea de comandos) elegir el producto e introducir las monedas hasta alcanzar 
o superar el importe a pagar. 
Si el importe ingresado es mayor que el precio del producto, el programa debe calcular el cambio a devolver
indicando el número mínimo de monedas a devolver de una a una.
Si el importe es exacto o bien inferior al precio, el programa deberá asimismo indicarlo mediante un mensaje.

La forma de ejecutar el programa sería:

`$ node buyFood.js A m1 m2 ... mN`

Donde el primer parámetro deberá ser `A`, `B` o `C` e indica el tipo de producto elegido
mientras que los valores `m<sub>i</sub>` corresponden a las monedas introducidas por el usuario.
Así por ejemplo la ejecución:

`$ node buyFood.js C 100 100 100 50 50 20 20 50`

Corresponde a la compra por parte del usuario del producto `C` pagando 4,9 Euros (tres monedas de 1€, tres
de 50 céntimos y dos de 20 céntimos).


Se requiere que todos los programas estén escritos siguiendo los criterios especificados en la [Google JavaScript Style Guide][2].

[1]: https://proofwiki.org/wiki/Sum_of_Sequence_of_Odd_Index_Fibonacci_Numbers "Sum of Sequence of Odd Index Fibonacci Numbers"

[2]: https://google.github.io/styleguide/jsguide.html "Google JavaScript Style Guide"
