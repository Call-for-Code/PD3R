"""
   Copyright 2018 Nirmal Adhikari, Lakshyana KC, Shreyasha Paudel, Kshitz Rimal, Nicolas Oritiz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
"""

import itertools
import pandas as pd


#File to export 
filename = "01 labeled_dataset.xlsx" 


''' Functions to calculate pier widths and 
    output status "Go" for retrofittable house, 
    or "No-Go" for non-retrofittble house '''

def calcPier(data,length):
    
    # Get Opening Parameters for each combination
    
    ## Opening 1 Dimensions 
    eo1 = data[0][0] #Edge Opening 1 / Position of Opening 1 
    o1w = data[0][0] # Opening 1 Width
    o1h = data[0][1] # Opening 1 Height
    
    ## Opening 2 Dimensions
    eo2 = data[1][0] # Edge Opening 2 /Position of Opening 2
    o2w = data[1][1] # Opening 2 Width
    o2h = data[1][1] # Opening 2 Height
    
    ## Opening 3 Dimensions
    eo3 = data[2][0] # Edge Opening 3 /Position of Opening 3 
    o3w = data[2][1] # Opening 3 Width
    o3h = data[2][1] # Opening 3 Height
    wt  = 0.5 
    
    # Pier Edge 1
    pe1 = eo1 
    
    # Middle Pier 1 Calculation
    pm1 = eo2-(eo1+o1w)
    
    # Middle Pier 2 
    pm2 = eo3-(eo2+o2w)
    pe2 = length-((2*wt)+eo3+o3w)
    status = ""
 
    #Condition to check for retrofittability based on pier width calculations
    if (pe1 >=0.6 and pe2 >= 0.6)and ((((o1h >1.2 or o2h>1.2) and (pm1 >=1)) or (o1h <=1.2 and o2h<=1.2 and pm1 >=0.6)) and 
(((o2h>1.2 or o3h>1.2) and (pm2 >=1)) or (o2h<=1.2 and o3h<= 1.2 and pm2 >=0.6))): 
        status = "go"   
    else:
        status = "no-go"
    return status


# Division of facade into nine segments with potential combinations for opening dimensions for each segment

# A1 : Segment 1
eo_a1 = [0.6,1.2]
w_a1  = [0.6,0.8]
h_a1  = [1.1]
sh_a1 = [0.3]
a1    = [eo_a1,w_a1,h_a1,sh_a1]
a1_comb = []

for elem in itertools.product(*a1):
    a1_comb.append(elem)
    

# B1 : Segment 2 
b1_comb = a1_comb


# C1 : Segment 3
eo_c1 = [0.6,1.2]
w_c1  = [0.8]
h_c1  = [0.4,0.6]
sh_c1 = [0.1]
c1    = [eo_c1,w_c1,h_c1,sh_c1]
c1_comb = []

for elem in itertools.product(*c1):
    c1_comb.append(elem)

# A2 : Segment 4
eo_a2 = [2.83,3.33]
w_a2  = [0.8]
h_a2  = [1.6,1.8]
sh_a2 = [0]
a2    = [eo_a2,w_a2,h_a2,sh_a2]
a2_comb = [] 

for elem in itertools.product(*a2):
    a2_comb.append(elem)

# B2 : Segment 5 
eo_b2 = [2.43,3.33]
w_b2  = [0.6,0.8]
h_b2  = [1.1]
sh_b2 = [0.3]
b2    = [eo_b2,w_b2,h_b2,sh_b2]
b2_comb = []

for elem in itertools.product(*b2):
    b2_comb.append(elem)

# C2: Segment 6
eo_c2 = [2.83,3.33]
w_c2  = [0.8]
h_c2  = [0.4,0.6]
sh_c2 = [0.1]
c2    = [eo_c2,w_c2,h_c2,sh_c2]
c2_comb = []
 
for elem in itertools.product(*c2):
    c2_comb.append(elem)

# A3: Segment 7
eo_a3 = [5.27,5.77]
w_a3  = [0.6,0.8]
h_a3  = [1.1]
sh_a3 = [0.3]
a3    = [eo_a3,w_a3,h_a3,sh_a3]
a3_comb = []

for elem in itertools.product(*a3):
    a3_comb.append(elem)

# B3: Segment 8
b3_comb = a3_comb 

# C3: Segment 9
eo_c3 = [5.27,5.77]
w_c3  = [0.8]
h_c3  = [0.4,0.6]
sh_c3 = [0.1]
c3    = [eo_c3,w_c3,h_c3,sh_c3]
c3_comb = []


# Get all combinations for the Wall
length = 8

for elem in itertools.product(*c3):
    c3_comb.append(elem)

allmodsw1   = [a1_comb,a2_comb,a3_comb,b1_comb,b2_comb,b3_comb,c1_comb,c2_comb,c3_comb] 
allcombw1   = []


# Cartesian Product of Combinations for all segments to get 4^9 labeled datasets of "Go" and "No-go" scenarios

for num, elem in enumerate(itertools.product(*allmodsw1)):
    
    #Calculate Opening Percentage per wall 
    sum_opw1 = elem[0][1]+elem[1][1]+elem[2][1]
    sum_opw2 = elem[3][1]+elem[4][1]+elem[5][1]
    sum_opw3 = elem[6][1]+elem[7][1]+elem[8][1]
    
    opercent1  = (sum_opw1/length)*100 
    opercent2  = (sum_opw2/length)*100
    opercent3  = (sum_opw3/length)*100
    
    # Output Status based on Opening Percent and Pier Calculation Checks
    status    = ["go" if opercent1<=35 and opercent2<=35 and opercent3<=35 and calcPier(elem,length) == "go" else "no-go"]
    
    # Merge lists of lists to get flattened rows per combination  
    flattenedrow = [val for sublist in elem for val in sublist]
    allcombw1.append([num+1, *flattenedrow,*status])
    
    
#Export Data to Excel    
df_w1 = pd.DataFrame(allcombw1)
df_w1.to_excel(filename,index=False)