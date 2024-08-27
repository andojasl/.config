## Week 1
CPU consists of:
* PC - Program counter
* IR - Instruction register
* MAR - Memory address register
* MBR - Memory buffer register
* Excecusion unit
* I/O AR - Input/output address register
* I/O BR - Input/output buffer register

System bus - connects Main memory, I/O Module and Cpu.


# Exam session :(

## Fetch-execute/Instruction cycle
Inside of computer there is a clock that executes one of the following commmands in order on each click: Fetch, Decode, Execute. In Fetch command it fetches the address of the command in RAM and puts it to __Programme Counter (PC)__. On decode command it decodes the value of the the address that was fetched before and stores it in __Intstructor Register (IR)__. On  Execute command does the operation stored in the value of the address  in RAM and stores the output in __Accumulator__.

### RAM (Random Access Memory)
Stores addresses in one column and stores the value of the address in the value column. Value  column usualy  consists of two parts - instruction itself and and memory  address - adress of the unit, item that is included in the operation. 

### Examle 
|Address| Value |

|0      | Load 6|

|1      |ADD 7|

|2     | Store 6|

|3      |Jump 6|

## Interupts

Everything that needs immediate attention (Like button clicks or mouse movement or even user input) generates an interupt that gets handled in the interupt handler and stops current process to deal with it. 
- __ISO__ - Interupt Service Routine - gets started everytime an interupt is generated. In Interupt handler it determines what program the interupt belongs to, what is the source of the interupt and so on. Later on the interupt is forwarded to the interupt controller and CPU.
- __Interupt Handler__ - Software that handles interupts
- __Interupt Controller__ - Hardware that deals with interupts after receiving instructions from the interupt handler.
- __Nested Interupts__ - interupts that interupt other interupt like: process 1 --x interupt 1 --x interupt 2 --> interupt 1 --> process 1.
- __Sequential Interupts__ - Interupts that happen one right  after the other.

## Cache 
CPU cache consists of three levels first one is the smallest but fastest, dedicated to its own CPU core. Level two is bigger but a bit slower (also on CPU core) and level three is the biggest, shared between all cores in the CPU but is the slowest as well. Data is firs searched in the first cache, then second, third and olny then on DRAM (RAM).
- DRAM - Dynamic Random Memory Access (Needs constant energy flow to store the data).
- SRAM - Static Random Memory Access  or chache (Does not need energy to store, is faster but way more expensive).