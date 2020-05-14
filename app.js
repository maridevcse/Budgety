

             var BudgetController = (function(UIctrl, AppCtrl) {

              var inc=function(id,description,value){

                this.id=id;
                this.description=description;
                this.value=value;
              };

              
              var exp=function(id,description,value){

                this.id=id;
                this.description=description;
                this.value=value;
                this.percentage=-1;
              };

              exp.prototype.calcPercentage=function(total){
                  if(total>0){
                  this.percentage=Math.round((this.value/total)*100);
                  //console.log(this.value);
                  }
                  else{
                    this.percentage=-1;
                  }
              };
              exp.prototype.getPercentage=function(){
                return this.percentage;
              }

              var datas={
                values:{
                      inc:[],
                      exp:[]
                  },

                total:{
                    inc:0,
                    exp:0
                },
                overall:0,
                percentage:0,
                
              };

            return{

                addData:function(type,des,val){
                var newItem,ID,valLength;
           
                valLength=datas.values[type].length;
                if( valLength > 0){
                 
                 ID=datas.values[type][datas.values[type].length-1].id+1;
            
                     
                }
                else if(valLength===0){
                     ID=0;
                }

                if(type==='inc'){
                    newItem=new inc(ID,des,val);
                }

                else if(type==='exp'){

                    newItem=new exp(ID,des,val);
                }

                datas.values[type].push(newItem);

                return newItem;

                 
            },

            updateTotal:function(type){
                tot=0;
               
                for(i=0;i<datas.values[type].length;i++){
                  
                  tot+=datas.values[type][i].value;
                  
               }
              



             
            if(type==="inc"){
            
              datas.total.inc=tot;   
              // document.querySelector('.budget__income--value').innerHTML=' + '+tot;
            }

            else if(type==="exp"){
                datas.total.exp=tot;
                // document.querySelector('.budget__expenses--value').innerHTML=" - "+tot;
            }
             },

              MaxTotal:function(){

                datas.overall=(datas.total.inc)-(datas.total.exp);
                if(datas.total.inc>0){
                datas.percentage=Math.round((datas.total.exp/datas.total.inc)*100);
                console.log(datas.percentage);
                }
                else{
                  datas.percentage=-1;
                  console.log(datas.percentage);
                }
                // document.querySelector('.budget__value').innerHTML=datas.overall;
              },

              getBudget:function(){
                return{
                  totalInc:datas.total.inc,
                  totalExp:datas.total.exp,
                  overallVal:datas.overall,
                  perIncome:datas.percentage

                }
              }, 

              deleteData:function(type,id){
              var ids,index,typ;
              if(type==="income"){
                  typ="inc";
                  ids= datas.values.inc.map(function(current){
                  return current.id;
                });
                
              }
              else if(type==="expense"){
                typ="exp";
                ids= datas.values.exp.map(function(current){
                return current.id;
                });
                
              }
                
              index=ids.indexOf(id);

              datas.values[typ].splice(index,1);

              
              },

              // calPer:function(){
              //   datas.values.exp.forEach(function(cur){
              //    cur.calcPercentage(datas.total.inc);
              //   });
              //    exps=datas.values.exp.map(function(cur){
              //      return cur.getPercentage();
              //    });
              //   //  console.log(exps);
              //      return exps;
              // },

              getData:function(){
                 return datas;
              }

              

            }


            })(UIController, AppController);






            var UIController = (function(BudgetCtrl, AppCtrl) {



              DOMstrings = {
                 type: '.add__type',
                 description: '.add__description',
                 values: '.add__value',
                 btn: '.add__btn',
                 incomecontainer:'.income__list',
                 expensecontainer:'.expenses__list',
                 
                
             }
 
               return {
                 getInput: function() {
                     return {
                         type: document.querySelector(DOMstrings.type).value,
                         description: document.querySelector(DOMstrings.description).value,
                         values:parseFloat(document.querySelector(DOMstrings.values).value),
                     }
                 },
  
                 CreateHTML:function(obj, type){
                   var html,newHTML,element;
                         if(type==="inc"){
 
                         element=DOMstrings.incomecontainer;
                          html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                         }
     
                         else if(type==="exp"){
                         element=DOMstrings.expensecontainer;
     
                         html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
     
     
     
                         }
                
                         newHTML=html.replace("%id%",obj.id);
                         newHTML=newHTML.replace("%description%",obj.description);
                         newHTML=newHTML.replace("%value%",obj.value);
                         
 
 
                         document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
     
                       },
 
 
                       ClearFields:function(){
                           var defaultFields,copyArray;
                           defaultFields=document.querySelectorAll('.add__description'+","+'.add__value');
                           copyArray=Array.prototype.slice.call(defaultFields);
 
                           copyArray.forEach(function(current,i,arr){
 
                             current.value="";
 
                           });
                           copyArray[0].focus();
      
 
                     //   document.querySelector('.add__description').value="";
                     //   document.querySelector('.add__value').value="";
                     //   document.querySelector('.add__description').focus();
 
                         
                       },
 
                    updateBudget:function(){
 
                     var Budget;
                     Budget=BudgetCtrl.getBudget();
                     document.querySelector('.budget__income--value').innerHTML=' + '+Budget.totalInc;
                     document.querySelector('.budget__expenses--value').innerHTML=" - "+Budget.totalExp;
                     document.querySelector('.budget__value').innerHTML=Budget.overallVal;
                     if(Budget.perIncome>0){
                     document.querySelector('.budget__expenses--percentage').innerHTML=Budget.perIncome+"%";
                     }
                     else{
                      document.querySelector('.budget__expenses--percentage').innerHTML="--";
                       
                     }
                   },

                   displayPercentages:function(){
                     var percentages=document.querySelectorAll('.item__percentage');
                    // var percentagesList=Array.prototype.slice.call(percentages)
                    //console.log(percentagesList);
                     var perArray=BudgetCtrl.calPer();
                     
                     for(var i=0;i<=perArray.length-1;i++){

                      //  console.log(percentagesList[i].className);
                       console.log(perArray[i]);
                       percentages[i].textContent=perArray[i];

                     }
                   },
                   displayMonth:function(){
                     var month,now,year;
                     now=new Date();
                     year=now.getFullYear();
                     months=["january","Feburary","March","April","May","june","july","August","September","october","November","december"];
                     month=now.getMonth();
                     document.querySelector('.budget__title--month').innerHTML=months[month]+" "+year;
                   },
 
                 getDOMStrings:function(){
                     return{
                         DOMstrings
                     };
                 }
 
 
             };

             })(BudgetController, AppController);
 
 




   var AppController = (function(UIctrl, BudgetCtrl) {
            function deleteItem(event){

            var item=event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(item){
               var type,id,data;
               document.getElementById(item).style.display="none";
               SplittedItem=item.split("-");
               type=SplittedItem[0];
               id=parseInt(SplittedItem[1]);
              //  console.log(BudgetCtrl.getData());
              // var mm= BudgetCtrl.getData().values.inc[0].delete();
              // console.log(mm);
              //  console.log(BudgetCtrl.getData());
              //  console.log(SplittedItem);
              BudgetCtrl.deleteData(type,id);
              BudgetCtrl.updateTotal("inc");
              BudgetCtrl.updateTotal("exp");
              BudgetCtrl.MaxTotal();
              UIctrl.updateBudget();
              BudgetCtrl.calPer();
              // UIctrl.displayPercentages();
              
            }
           


          





            }

           
    
            function addItem() {
                   var inputs = UIctrl.getInput();
           
                  //     console.log(typeof(inputs.value));
                  // console.log(typeof(inputs.description));
                  //  console.log(inputs.description!=="");
                  //  console.log(inputs.value!=undefined);
                  //  console.log(!isNaN(""));
                  //  console.log(inputs.values===!isNaN);
                  
                   if(inputs.description!=="" && !isNaN(inputs.values) && inputs.values>0){

                    var newItem=BudgetCtrl.addData(inputs.type,inputs.description,inputs.values);
                    console.log(newItem);
   
                    
                    UIctrl.CreateHTML(newItem,inputs.type);
                    UIctrl.ClearFields();
                    var inputs = UIctrl.getInput();
                    BudgetCtrl.updateTotal(inputs.type);
                    BudgetCtrl.MaxTotal();
                    UIctrl.updateBudget();
                    // BudgetCtrl.calPer();
                    // UIctrl.displayPercentages();
                    // console.log(BudgetCtrl.getData());
                 
                   
                    

                   }
                   else {
                     alert("Please Enter the valid values in InputFiels");
                     UIctrl.ClearFields();
                   }
                    

                  
    


                    
                }
                
            function setUPEventlistioners(){

                var DOM=UIctrl.DOMS;

                document.addEventListener('keypress', function(e) {
                    if (e.keyCode === 13 || e.which === 13) {
                        addItem();
                    }
                      });
   
               document.querySelector(".add__btn").addEventListener('click', addItem);
               document.querySelector(".container").addEventListener('click',deleteItem);

               
            }

            


          return{

                  init:function(){
                  console.log("Application has Started");
                  setUPEventlistioners();
                  UIctrl.displayMonth();
           }
        }
        
    
    })(UIController, BudgetController);

     AppController.init();


   