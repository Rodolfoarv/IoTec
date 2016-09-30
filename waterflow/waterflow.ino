
volatile int flow_frequency; // Measures flow sensor pulses
unsigned int l_hour; // Calculated litres/hour
unsigned char flowsensor = 2; // Sensor Input
unsigned long currentTime;
unsigned long cloopTime;
long distanceSonar; // Distancia del sonar
long timeSonar; // Tiempo del sonar

void flow () // Interrupt function
{
   flow_frequency++;
}
void setup()
{
   pinMode(flowsensor, INPUT);
   digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up
   Serial.begin(9600);
   attachInterrupt(0, flow, RISING); // Setup Interrupt
   sei(); // Enable interrupts
   currentTime = millis();
   cloopTime = currentTime;

   pinMode(3, OUTPUT); /*activación del pin 9 como salida: para el pulso ultrasónico*/
   pinMode(4, INPUT); /*activación del pin 8 como entrada: tiempo del rebote del ultrasonido*/
}
void loop ()
{
   currentTime = millis();
   // Every second, calculate and print litres/hour
   if(currentTime >= (cloopTime + 1000))
   {
      cloopTime = currentTime; // Updates cloopTime
      // Pulse frequency (Hz) = 7.5Q, Q is flow rate in L/min. n
      l_hour = (flow_frequency * 60 / 7.5); // (Pulse frequency x 60 min) / 7.5Q = flowrate in L/hour
      flow_frequency = 0; // Reset Counter
      Serial.print(l_hour);
      Serial.print(",");
      digitalWrite(3,LOW); /* Por cuestión de estabilización del sensor*/
      delayMicroseconds(5);
      digitalWrite(3, HIGH); /* envío del pulso ultrasónico*/
      delayMicroseconds(5);
      timeSonar=pulseIn(4, HIGH); /* Función para medir la longitud del pulso entrante. Mide el tiempo que transcurrido entre el envío
      del pulso ultrasónico y cuando el sensor recibe el rebote, es decir: desde que el pin 12 empieza a recibir el rebote, HIGH, hasta que
      deja de hacerlo, LOW, la longitud del pulso entrante*/
      distanceSonar= int(0.017*timeSonar); /*fórmula para calcular la distancia obteniendo un valor entero*/
      /*Monitorización en centímetros por el monitor serial*/
      Serial.println(distanceSonar);
      delay(1000);
   } 


}
