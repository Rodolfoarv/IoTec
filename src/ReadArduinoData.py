import serial
import csv
import time
import datetime
# import dropbox

# client = dropbox.client.DropboxClient("WtVcJzd9p6kAAAAAAAAEgByVUXF89XNOni4B2BtMjXuP_Y7z0SWH5lOiBiCLI1x4")
ser = serial.Serial('COM3', 9600)
print "test"

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

        print "%s %s" % (litersPerHour, strainer_height)

        csv_writer.writerow([litersPerHour, strainer_height,dayFormat, now.hour,now.minute,now.second,1])
        time.sleep(0.05)


with open('Experiment.csv', 'wb' ) as csvfile:
    processing_loop(csvfile)

# f = open('Experiment.csv', 'rb')
# response = client.put_file('Experiment.csv', f)
