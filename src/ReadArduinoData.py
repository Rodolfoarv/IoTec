import serial
import csv
import time
import datetime

ser = serial.Serial('COM3', 9600)


COLUMN_VALUES = ['Liters per Hour', 'Strainer Height', 'Day','Hour','Minutes','Seconds','Label',]
def processing_loop(csvfile):
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(COLUMN_VALUES)
    while True:

        arduino_values = ser.readline()
        split_values = arduino_values.split(',')
        litersPerHour = split_values[0]
        strainer_height = split_values[1].rstrip('\r\n')
        now = datetime.datetime.now()
        dayFormat = now.strftime("%d/%m/%Y")


        csv_writer.writerow([litersPerHour, strainer_height,dayFormat, now.hour,now.minute,now.second,1])
        time.sleep(0.05)


with open('test_basura.csv', 'wb' ) as csvfile:
    processing_loop(csvfile)
