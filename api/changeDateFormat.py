import sys

import pandas as pd

# change date format to yyyy-mm-dd hh:mm:ss (for mysql)

def format_date(date):
    year = date.split("-")[0]
    month = date.split("-")[1]
    day = date.split("-")[2].split("T")[0]
    hhmmss = date.split("T")[1].split("+")[0]
    return f"{year}-{month}-{day} {hhmmss}"


filepath_in = sys.argv[1]
filepath_out = sys.argv[2]


def process(chunk, offset):
    for i in range(chunk.shape[0]):
        date = chunk.loc[i + offset , "departuredate"]
        chunk.loc[i + offset, "departuredate"] = format_date(date)
        date = chunk.loc[i + offset, "returndate"]
        chunk.loc[i + offset, "returndate"] = format_date(date)
        date = chunk.loc[i + offset, "inboundarrivaldatetime"]
        chunk.loc[i + offset, "inboundarrivaldatetime"] = format_date(date)
        date = chunk.loc[i + offset, "outboundarrivaldatetime"]
        chunk.loc[i + offset, "outboundarrivaldatetime"] = format_date(date)
       
        

header = True
offset = 0
chunksize = 10 ** 3
for chunk in pd.read_csv(filepath_in, chunksize=chunksize):
    process(chunk, offset)
    offset += chunksize
    chunk.to_csv(filepath_out, index=False, header=header, mode='a')
    header = False
    sys.stdout.write(f"\r{offset}")
    sys.stdout.flush() 