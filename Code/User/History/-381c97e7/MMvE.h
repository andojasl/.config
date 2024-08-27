
#ifndef LL_H
#define LL_H

#include <stdio.h>
#include <stdlib.h>
enum HELLO;

struct Snode {
    int value;
    struct Snode *next;
};

typedef struct Snode node;

struct list {
    node *head;
    int count;
};

typedef struct list LL;

void constructLL(LL *list);
void destructLL(LL *list);
void printLL(LL *list);
int countLL(LL *list);
void addRearLL(LL *list, int number);
void addFrontLL(LL *list, int number);
void deleteLL(LL *list, int number);
void copyLL(LL *dest, LL *src);

#endif

